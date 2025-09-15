import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";
import MedicalHistory from '../models/medicalHistoryModel.js';


//getPatientProfile is Created Already
export const getPatientProfile = async (req, res) => {
  try {
    const patientProfile = await Patient.findOne({
      userId: req.user.id,
    }).populate("userId", "mobileNo");

    if (!patientProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Patient profile not found." });
    }

    const isMedicalHistory = await MedicalHistory.find(patientProfile._id)

    //GET ALL MEDICAL HISTORY AS WELL
    if(isMedicalHistory){
        patientProfile.MedicalHistory = isMedicalHistory
    }

    res.status(200).json({ success: true, data: patientProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetch patient Profile.",
      Error: error,
    });
  }
};

//update Patient Profile
export const updatePatientProfile = async (req, res) => {
  const { userId } = req.user;
  const {
    name,
    email,
    dateOfBirth,
    gender,
    bloodGroup,
    address
  } = req.body;

  try {
    const updatedProfile = await Patient.findOneAndUpdate(
      { userId: userId },
      {
        name,
        email,
        dateOfBirth,
        gender,
        bloodGroup,
        address,
      },
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

    res.status(200).json({
      success: true,
      message: "Patient profile updated.",
      data: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};


//create Patient Profile
export const createPatientProfile = async (req, res) => {

  try {
    const { userId } = req.user;
    const { name, email, dateOfBirth, gender, bloodGroup, address } = req.body;

    const existingProfile = await Patient.findOne({ userId });
    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message:
          "Patient profile already exists. Please use the update endpoint.",
      });
    }


    const newPatientProfile = new Patient({
      userId,
      name,
      email,
      dateOfBirth,
      gender,
      bloodGroup,
      address
    });

    await newPatientProfile.save();

    res.status(201).json({
      success: true,
      message: "Patient profile created successfully.",
      data: newPatientProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while create Patient Profile",
      error: error.message,
    });
  }
};


//create Medical History
export const createMedicalHistory = async (req, res) => {
  const { userId } = req.user._id; 
  const { condition, diagnosisDate, treatment, notes ,doctorName} = req.body;

  try {
    const patientProfile = await Patient.findOne({ userId: userId });
    if (!patientProfile) {
      return res.status(404).json({ success: false, message: 'Patient profile not found.' });
    }

    const newRecord = new MedicalHistory({
      patientId: patientProfile._id,
      condition,
      diagnosisDate,
      treatment,
      notes,
      //doctor can be from anywhere, outside or application registered
      doctorName
    });

    await newRecord.save();

    res.status(201).json({
      success: true,
      message: 'Medical history record created.',
      data: newRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while update medical history.', error: error.message });
  }
};