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
    console.error(error);
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
    const { specialization, service, search } = req.query;

    const query = { verified: true };

    // Add filters based on provided query parameters
    if (specialization) {
      query.specialization = { $regex: new RegExp(specialization, "i") };
    }

    if (service) {
      query.services = { $in: [new RegExp(service, "i")] };
    }

    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { clinicAddress: { $regex: new RegExp(search, "i") } },
      ];
    }

    const doctors = await Doctor.find(query).select("-userId -__v");

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while searching a doctor.",
      error: error.message,
    });
  }
};

//top rated Doctors by rating and appointments

