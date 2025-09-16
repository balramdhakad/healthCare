import moment from "moment";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

export const createDoctorProfile = async (req, res) => {
  const userId = req.user._id;
  const {
    name,
    email,
    specialization,
    experience,
    qualifications,
    clinicAddress,
    fees,
    availability,
  } = req.body;

  try {
    const existingProfile = await Doctor.findOne({ userId });
    if (existingProfile) {
      return res
        .status(409)
        .json({ message: "Doctor profile already exists." });
    }

    const newDoctorProfile = new Doctor({
      userId,
      name,
      email,
      specialization,
      experience,
      qualifications,
      clinicAddress,
      fees,
      availability,
    });

    await newDoctorProfile.save();
    res
      .status(201)
      .json({ message: "Doctor profile created.", data: newDoctorProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to update an existing doctor profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedProfile = await Doctor.findOneAndUpdate(
      { userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ message: "Doctor profile not found Create profile First." });
    }

    res
      .status(200)
      .json({ message: "Doctor profile updated.", data: updatedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

//get profile
export const getProfile = async (req, res) => {
  try {
    const doctorProfile = await Doctor.findOne({ userId: req.user._id });

    if (!doctorProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Create your profile First." });
    }

    res.status(200).json({ success: true, data: doctorProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetch Profile.",
      error: error.message,
    });
  }
};

//Get Today's Appointment
export const getTodayAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const today = moment().startOf("day").toDate();
    const tomorrow = moment(today).add(1, "days").toDate();

    const appointments = await Appointment.find({
      doctorId: doctorId,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ time: 1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while fetch today's appointment.",
        Error: error?.message,
      });
  }
};

//Get appointment History
export const getDoctorAppointmentHistory = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const appointments = await Appointment.find({ doctorId: doctorId })
      .populate("patientId", "name mobileNo")
      .sort({ date: -1, time: -1 });

    // if (!appointments.length) {
    //   return res.status(200).json({ success: true, message: 'No appointment history found.', data: [] });
    // }

    res
      .status(200)
      .json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while fetch all appoinments.",
        error: error.message,
      });
  }
};
