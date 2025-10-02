import Community from "../../models/community/communityModel.js";
import Appointment from "../../models/healthCare/appointmentModel.js";
import Doctor from "../../models/healthCare/doctorModel.js";
import mongoose from "mongoose";
import MedicalHistory from "../../models/healthCare/medicalHistoryModel.js";
import Patient from "../../models/healthCare/patientModel.js";

//getDoctorById

export const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
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
        $unwind: {
          path: "$appointments",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            { "appointments.rating": { $eq: null } },
            { "appointments.rating.rating": { $gte: 1, $lte: 5 } },
          ],
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "appointments.patientId",
          foreignField: "userId",
          as: "patientDetails",
        },
      },
      {
        $unwind: {
          path: "$patientDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          mobileNo: { $first: "$mobileNo" },
          specialization: { $first: "$specialization" },
          experience: { $first: "$experience" },
          bio: { $first: "$bio" },
          qualifications: { $first: "$qualifications" },
          fees: { $first: "$fees" },
          email: { $first: "$email" },
          clinicAddress: { $first: "$clinicAddress" },
          profilePic: { $first: "$profilePic" },
          appointmentTypes: { $first: "$appointmentTypes" },
          availability: { $first: "$availability" },

          reviews: {
            $push: {
              $cond: [
                {
                  $and: [
                    { $ne: ["$appointments.rating", null] },
                    { $gte: ["$appointments.rating.rating", 1] },
                    { $lte: ["$appointments.rating.rating", 5] },
                  ],
                },
                {
                  rating: "$appointments.rating.rating",
                  comment: "$appointments.rating.comment",
                  ratedAt: "$appointments.rating.ratedAt",
                  patientName: "$patientDetails.name",
                  patientProfilePic: "$patientDetails.profilePic",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          id: "$_id",
          _id: 0,
          name: 1,
          specialization: 1,
          mobileNo: 1,
          experience: 1,
          bio: 1,
          qualifications: 1,
          fees: 1,
          email: 1,
          clinicAddress: 1,
          profilePic: 1,
          appointmentTypes: 1,
          availability: 1,

          averageRating: {
            $avg: "$reviews.rating",
          },
          reviewsCount: {
            $size: "$reviews",
          },
          ratingsBreakdown: {
            5: {
              $size: {
                $filter: {
                  input: "$reviews",
                  as: "r",
                  cond: { $eq: ["$$r.rating", 5] },
                },
              },
            },
            4: {
              $size: {
                $filter: {
                  input: "$reviews",
                  as: "r",
                  cond: { $eq: ["$$r.rating", 4] },
                },
              },
            },
            3: {
              $size: {
                $filter: {
                  input: "$reviews",
                  as: "r",
                  cond: { $eq: ["$$r.rating", 3] },
                },
              },
            },
            2: {
              $size: {
                $filter: {
                  input: "$reviews",
                  as: "r",
                  cond: { $eq: ["$$r.rating", 2] },
                },
              },
            },
            1: {
              $size: {
                $filter: {
                  input: "$reviews",
                  as: "r",
                  cond: { $eq: ["$$r.rating", 1] },
                },
              },
            },
          },

          recentReviews: {
            $slice: [
              {
                $sortArray: {
                  input: {
                    $filter: {
                      input: "$reviews",
                      as: "r",
                      cond: {
                        $and: [
                          { $ne: ["$$r.comment", null] },
                          { $ne: ["$$r.comment", ""] },
                        ],
                      },
                    },
                  },
                  sortBy: { ratedAt: -1 },
                },
              },
              5,
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

    const finalData = doctorDetails[0];
    if (finalData.averageRating) {
      finalData.averageRating = parseFloat(finalData.averageRating.toFixed(1));
    }

    res.status(200).json({ success: true, data: finalData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while finding Doctor.",
      Error: error.message,
    });
  }
};

//perform searching
export const searchDoctors = async (req, res) => {
  try {
    const { specialization, qualifications, search, appointmentTypes } =
      req.query;

    const query = { verified: true };

    if (specialization) {
      query.specialization = { $regex: new RegExp(specialization, "i") };
    }

    if (qualifications) {
      query.qualifications = { $in: [new RegExp(qualifications, "i")] };
    }

    if (appointmentTypes) {
      const typesArray = Array.isArray(appointmentTypes)
        ? appointmentTypes
        : appointmentTypes.split(",");

      query.appointmentTypes = { $in: typesArray };
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

//get Patient profile
export const getPatientProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientProfile = await Patient.findById(id).populate(
      "userId",
      "mobileNo"
    );

    if (!patientProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Patient profile not found." });
    }

    const AllMedicalHistory = await MedicalHistory.find({ patientId: id });
    res
      .status(200)
      .json({ success: true, data: { patientProfile, AllMedicalHistory } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetch patient Profile.",
      Error: error?.message,
    });
  }
};
