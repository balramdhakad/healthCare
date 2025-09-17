import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";

//getDoctorById
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findById(id).select("-userId -__v");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found." });
    }

    if (!doctor.verified) {
      // Prevent unverified doctors from being viewed
      return res
        .status(403)
        .json({ success: false, message: "Doctor not verified." });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while find Doctor.",
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

    const doctors = await Doctor.find(query).select("-userId -__v");

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

//top rated Doctors by rating and appointments
export const getTopRatedDoctors = async (req, res) => {
  try {
    const topDoctors = await Appointment.aggregate([
      // Filter to get only completed appointments with a rating
      {
        $match: {
          status: "completed",
          "rating.rating": { $exists: true },
        },
      },

      // Group by doctor to calculate metrics
      {
        $group: {
          _id: "$doctorId",
          averageRating: { $avg: "$rating.rating" },
          appointmentCount: { $sum: 1 },
        },
      },

      // Filter out doctors with fewer than 10 appointments
      {
        $match: {
          appointmentCount: { $gt: 10 },
        },
      },

      // Sort by average rating in descending order
      {
        $sort: {
          averageRating: -1,
        },
      },

      //Limit to the top 10
      {
        $limit: 10,
      },

      // Join with the Doctor collections to get full profile details
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

      // Select the fields to return in the final response
      {
        $project: {
          _id: 0,
          doctorId: "$_id",
          name: "$doctorProfile.name",

          //TODO :: after multer implementation
          // profilePic: "$doctorProfile.profilePic",
          specialization: "$doctorProfile.specialization",
          averageRating: 1,
          appointmentCount: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: topDoctors });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetch top doctors.",
      error: error.message,
    });
  }
};
