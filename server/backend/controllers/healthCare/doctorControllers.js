import moment from "moment";
import Doctor from "../../models/healthCare/doctorModel.js";
import Appointment from "../../models/healthCare/appointmentModel.js";
import User from "../../models/healthCare/userModel.js";

export const createDoctorProfile = async (req, res) => {
  const userId = req.user._id;
  console.log(req.body);

  const {
    name,
    mobileNo,
    email,
    specialization,
    experience,
    qualifications,
    clinicAddress,
    fees,
    availability,
    appointmentTypes,
  } = req.body;

  if (availability && typeof availability === "string") {
    availability = JSON.parse(availability);
  }
  if (qualifications && typeof qualifications === "string") {
    qualifications = JSON.parse(qualifications);
  }
  if (appointmentTypes && typeof appointmentTypes === "string") {
    appointmentTypes = JSON.parse(appointmentTypes);
  }

  try {
    const existingProfile = await Doctor.findOne({ userId });
    if (existingProfile) {
      return res
        .status(409)
        .json({ message: "Doctor profile already exists." });
    }

    let profilePic;
    if (req?.file) {
      profilePic = req.file?.path;
    }

    if (name) {
      await User.findByIdAndUpdate(userId, { name: req.body.name });
    }

    if (mobileNo) {
      await User.findByIdAndUpdate(userId, { mobileNo: req.body.mobileNo });
    }

    const newDoctorProfile = new Doctor({
      _id: userId,
      userId,
      name: name || req.user.name,
      email,
      specialization,
      experience,
      qualifications,
      clinicAddress,
      fees,
      mobileNo: mobileNo || req.user.mobileNo,
      availability: availability,
      profilePic,
    });

    await newDoctorProfile.save();
    res
      .status(201)
      .json({ message: "Doctor profile created.", data: newDoctorProfile });
  } catch (error) {
    res.status(500).json({
      message: "Server error while create profile.",
      Error: error?.message,
    });
  }
};

// update an existing doctor profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateFields = { ...req.body };

    if (req?.file) {
      updateFields.profilePic = req.file?.path;
    }

    if (
      updateFields.availability &&
      typeof updateFields.availability === "string"
    ) {
      updateFields.availability = JSON.parse(updateFields.availability);
    }
    if (
      updateFields.qualifications &&
      typeof updateFields.qualifications === "string"
    ) {
      updateFields.qualifications = JSON.parse(updateFields.qualifications);
    }
    if (
      updateFields.appointmentTypes &&
      typeof updateFields.appointmentTypes === "string"
    ) {
      updateFields.appointmentTypes = JSON.parse(updateFields.appointmentTypes);
    }

    const updatedProfile = await Doctor.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { new: true, runValidators: false }
    );

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ message: "Doctor profile not found Create profile First." });
    }

    if (req.body?.name) {
      await User.findByIdAndUpdate(userId, { name: req.body.name });
    }

    res
      .status(200)
      .json({ message: "Doctor profile updated.", data: updatedProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error while update profile.",
      Error: error?.message,
    });
  }
};

//get profile
export const getProfile = async (req, res) => {
  try {
    const doctorProfile = await Doctor.findById(req.user._id);

    if (!doctorProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Create your profile First." });
    }

    res.status(200).json({ success: true, data: doctorProfile });
  } catch (error) {
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
    })
      .populate("patientId", "name mobileNo")
      .sort({ time: -1 });

    res.status(200).json({ success: true, data: appointments || [] });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      success: false,
      message: "Server error while fetch all appoinments.",
      error: error.message,
    });
  }
};

// Get Doctor Availability
export const getDoctorAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const day = new Date(date).toLocaleDateString("en-IN", { weekday: "long" });
    const availability = doctor.availability.find((a) => a.day === day);

    if (!availability) {
      return res.status(200).json({ success: true, slots: [] });
    }

    const slots = [];
    let [h, m] = availability.startTime.split(":").map(Number);
    const [endH, endM] = availability.endTime.split(":").map(Number);

    while (h < endH || (h === endH && m < endM)) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      slots.push(time);

      m += availability.slotDuration;
      if (m >= 60) {
        h += Math.floor(m / 60);
        m = m % 60;
      }
    }

    res.json({ success: true, slots });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
