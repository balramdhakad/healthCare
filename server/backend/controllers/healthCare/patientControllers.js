import Patient from "../../models/healthCare/patientModel.js";
import User from "../../models/healthCare/userModel.js";
import MedicalHistory from "../../models/healthCare/medicalHistoryModel.js";
import Appointment from "../../models/healthCare/appointmentModel.js";

//getPatientProfile if Created Already
export const getPatientProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const patientProfile = await Patient.findOne({
      userId: userId,
    }).populate("userId", "mobileNo");

    if (!patientProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Patient profile not found." });
    }

    const AllMedicalHistory = await MedicalHistory.find({ patientId: userId });

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

//update Patient Profile
export const updatePatientProfile = async (req, res) => {
  const userId = req.user._id;
  const updateFields = { ...req.body };

  if (req?.file) {
    updateFields.profilePic = req.file?.path;
  }

  console.log(updateFields)

  try {
    const updatedProfile = await Patient.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found. Please create one first.",
      });
    }

    if (req.body?.name) {
      await User.findByIdAndUpdate(userId, { name: req.body.name });
    }
    if (req.body?.mobileNo) {
      await User.findByIdAndUpdate(userId, { name: req.body.mobileNo });
    }

    res.status(200).json({
      success: true,
      message: "Patient profile updated.",
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Server error.",
      Error: error?.message,
    });
  }
};

//create Patient Profile
export const createPatientProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email, dateOfBirth, gender, bloodGroup, address } = req.body;

    const existingProfile = await Patient.findOne({ userId });
    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message:
          "Patient profile already exists. Please use the update endpoint.",
      });
    }

    const newPatientProfile = new Patient({
      _id: userId,
      userId,
      name: req.user.name,
      email,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      mobileNo: req.user.mobileNo,
    });

    await newPatientProfile.save();

    res.status(201).json({
      success: true,
      message: "Patient profile created successfully.",
      data: newPatientProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while create Patient Profile",
      Error: error?.message,
    });
  }
};

//create Medical History
export const createMedicalHistory = async (req, res) => {
  const userId = req.user._id;
  const { condition, diagnosisDate, treatment, notes, doctorName } = req.body;

  let image;
  if(req?.file){
    image = req.file.path
  }

  try {
    const patientProfile = await Patient.findById(userId);
    if (!patientProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Patient profile not found." });
    }

    const newRecord = new MedicalHistory({
      patientId: patientProfile._id,
      condition,
      diagnosisDate,
      treatment,
      notes,
      doctorName,
      image
    });


    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "Medical history record created.",
      data: newRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while update medical history.",
      Error: error?.message,
    });
  }
};

//getAll Medical History
export const getMedicalHistory = async (req, res) => {
  try {
    const patientProfile = await Patient.findOne({ userId: req.user._id });
    if (!patientProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found." });
    }

    const history = await MedicalHistory.find({
      patientId: patientProfile._id,
    }).sort({ diagnosisDate: -1 });

    res
      .status(200)
      .json({ success: true, count: history.length, data: history });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetch medical history.",
      error: error.message,
    });
  }
};

//Get appoiment history
export const getPatientAppointmentHistory = async (req, res) => {
  try {
    const patientId = req.user._id;

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name specialization clinicAddress")
      .sort({ date: -1, time: -1 });

    res
      .status(200)
      .json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetch patient appoinment history.",
      Error: error?.message,
    });
  }
};
