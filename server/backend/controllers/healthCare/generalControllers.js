import Community from "../../models/community/communityModel.js";
import Appointment from "../../models/healthCare/appointmentModel.js";
import Doctor from "../../models/healthCare/doctorModel.js";
import mongoose from "mongoose";

//getDoctorById
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Doctor ID." });
    }

    const doctorDetails = await Doctor.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "appointments",
          localField: "_id",
          foreignField: "doctorId",
          as: "appointments",
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          specialization: 1,
          experience: 1,
          bio: 1,
          qualifications: 1,
          fees: 1,
          verified: 1,
          email: 1,
          clinicAddress: 1,
          profilePic: 1,
          appointmentTypes: 1,
          communities: 1,
          availability: 1,
          averageRating: {
            $avg: {
              $filter: {
                input: "$appointments.rating",
                as: "rating",
                cond: { $ne: ["$$rating", null] },
              },
            },
          },
          reviewsCount: {
            $size: {
              $filter: {
                input: "$appointments.rating",
                as: "rating",
                cond: { $ne: ["$$rating", null] },
              },
            },
          },
          ratingsBreakdown: {
            5: {
              $size: {
                $filter: {
                  input: "$appointments.rating",
                  as: "rating",
                  cond: { $eq: ["$$rating.rating", 5] },
                },
              },
            },
            4: {
              $size: {
                $filter: {
                  input: "$appointments.rating",
                  as: "rating",
                  cond: { $eq: ["$$rating.rating", 4] },
                },
              },
            },
            3: {
              $size: {
                $filter: {
                  input: "$appointments.rating",
                  as: "rating",
                  cond: { $eq: ["$$rating.rating", 3] },
                },
              },
            },
            2: {
              $size: {
                $filter: {
                  input: "$appointments.rating",
                  as: "rating",
                  cond: { $eq: ["$$rating.rating", 2] },
                },
              },
            },
            1: {
              $size: {
                $filter: {
                  input: "$appointments.rating",
                  as: "rating",
                  cond: { $eq: ["$$rating.rating", 1] },
                },
              },
            },
          },
          recentReviews: {
            $slice: [
              {
                $map: {
                  input: {
                    $filter: {
                      input: "$appointments",
                      as: "appt",
                      cond: { $ne: ["$$appt.rating", null] },
                    },
                  },
                  as: "appt",
                  in: {
                    text: "$$appt.rating.comment",
                    rating: "$$appt.rating.rating",
                  },
                },
              },
              10,
            ],
          },
        },
      },
    ]);

    if (doctorDetails.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found." });
    }

    res.status(200).json({ success: true, data: doctorDetails[0] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while finding Doctor.",
      error: error.message,
    });
  }
};

//perform searching
export const searchDoctors = async (req, res) => {
  try {
    const { specialization, qualifications, search } = req.query;

    const query = { verified: true };

    // Add filters based on provided query parameters
    if (specialization) {
      query.specialization = { $regex: new RegExp(specialization, "i") };
    }

    if (qualifications) {
      query.qualifications = { $in: [new RegExp(qualifications, "i")] };
    }

    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { clinicAddress: { $regex: new RegExp(search, "i") } },
        { specialization: { $regex: new RegExp(search, "i") } },
        { qualifications: { $regex: new RegExp(search, "i") } },
      ];
    }

    const doctors = await Doctor.find(query).select(
      "-userId -__v -communities -availability -createdAt -updatedAt"
    );

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while searching a doctor.",
      error: error.message,
    });
  }
};

export const getTopRatedData = async (req, res) => {
  try {
    const [topDoctors, topCommunities, topRatedAppointments] =
      await Promise.all([
        Appointment.aggregate([
          {
            $match: {
              status: "completed",
              "rating.rating": { $exists: true },
            },
          },
          {
            $group: {
              _id: "$doctorId",
              averageRating: { $avg: "$rating.rating" },
              appointmentCount: { $sum: 1 },
            },
          },
          {
            $match: {
              appointmentCount: { $gt: 0 },
            },
          },
          {
            $sort: {
              averageRating: -1,
            },
          },
          {
            $limit: 10,
          },
          {
            $lookup: {
              from: "doctors",
              localField: "_id",
              foreignField: "_id",
              as: "doctorProfile",
            },
          },
          {
            $unwind: "$doctorProfile",
          },
          {
            $project: {
              _id: 0,
              doctorId: "$_id",
              name: "$doctorProfile.name",
              profilePic: "$doctorProfile.profilePic",
              specialization: "$doctorProfile.specialization",
              averageRating: 1,
              appointmentCount: 1,
            },
          },
        ]),

        // Top 10 Communities
        Community.aggregate([
          {
            $project: {
              name: 1,
              postCount: 1,
              _id: 1,
              membersCount: { $size: "$members" },
            },
          },
          {
            $sort: { membersCount: -1 },
          },
          {
            $limit: 10,
          },
        ]),

        // Top 10 Rated Appointments ratings
        Appointment.find({
          "rating.rating": { $exists: true },
        })
          .select("patientId rating.rating rating.comment")
          .populate({
            path: "patientId",
            select: "name",
          })
          .sort({ "rating.rating": -1 })
          .limit(10),
      ]);

    res.status(200).json({
      success: true,
      data: { topDoctors, topCommunities, topRatedAppointments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching top data.",
      error: error.message,
    });
  }
};
