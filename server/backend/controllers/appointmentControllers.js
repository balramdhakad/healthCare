import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";

//Request  approvemnet by patient
export const requestAppointment = async (req, res) => {
  try {
    const patientId = req.user._id;
    const { doctorId, date, time, reasonForVisit } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.verified) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found or not verified." });
    }

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      reasonForVisit,
    });

    await newAppointment.save();
    res
      .status(201)
      .json({ success: true, message: "Appointment requested successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

//approve appoinment by doctor
export const approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorId = req.user._id;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    if (appointment.doctorId.toString() !== doctorId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access." });
    }

    appointment.isApproved = true;
    //token assign by doctor
    if (req.body.tokenNo) appointment.tokenNo = req.body.tokenNo;

    // default token number
    if (!req.body.tokenNo) {
      const approvedCount = await Appointment.countDocuments({
        doctorId,
        date: appointment.date,
        isApproved: true,
      });
      appointment.tokenNo = approvedCount + 1;
    }
    appointment.status = "scheduled";

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment approved.",
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

//to cancel or complete appoinment
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const doctorId = req.user._id;

    // Validate the provided status
    const validStatuses = ["completed", "canceled"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status provided error at frontend only completed and cancel allowed.",
      });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    if (appointment.doctorId.toString() !== doctorId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access." });
    }

    //only completed if approved previously
    if (status === "completed" && appointment.isApproved) {
      appointment.status = completed;
    }

    //To cancel appoinment
    if (status === "canceled") {
      appointment.status = "canceled";
    }

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment status updated.",
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

//Appointment Rating
export const submitAppointmentRating = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user._id;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "A valid rating between 1 and 5 is required.",
      });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    if (appointment.patientId.toString() !== patientId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to rate this appointment.",
      });
    }

    if (appointment.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Only completed appointments can be rated.",
      });
    }

    appointment.rating = {
      rating,
      comment,
    };
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Rating submitted successfully.",
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while rate appointment.",
      error: error.message,
    });
  }
};
