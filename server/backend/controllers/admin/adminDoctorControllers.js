import { trusted } from "mongoose";
import Doctor from "../../models/healthCare/doctorModel.js";

//get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find({})
      .limit(limit)
      .skip(skip)
      .select("name email verified appointmentTypes")
      .sort({ createdAt: -1 })
      .lean();

    const totalDoctors = await Doctor.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalDoctors / limit),
      totalResults: doctors.length,
      doctors,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error fetching doctors." });
  }
};

//get All verified Doctors
export const getAllUnVerifiesDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find({ verified: false })
      .limit(limit)
      .skip(skip)
      .select("name email verified appointmentTypes")
      .sort({ createdAt: -1 })
      .lean();

    const totalDoctors = await Doctor.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalDoctors / limit),
      totalResults: doctors.length,
      doctors,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error fetching doctors." });
  }
};

// get all verified Doctos
export const getAllVerifiesDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find({ verified: true })
      .limit(limit)
      .skip(skip)
      .select("name email verified appointmentTypes")
      .sort({ createdAt: -1 })
      .lean();

    const totalDoctors = await Doctor.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalDoctors / limit),
      totalResults: doctors.length,
      doctors,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error fetching doctors." });
  }
};

//verify Doctor and Unverify as well

export const verifyDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const newVerifiedStatus =
      req.body?.verifiedStatus !== undefined ? false : true;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { verified: newVerifiedStatus },
      { new: true, select: "name email verified appointmentTypes" }
    );

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found." });
    }

    res.status(200).json({
      success: true,
      message: `Doctor ${doctor.name} successfully verified.`,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while verifying doctor.",
      Error: error?.message,
    });
  }
};
