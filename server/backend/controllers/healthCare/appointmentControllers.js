import Appointment from "../../models/healthCare/appointmentModel.js";
import Doctor from "../../models/healthCare/doctorModel.js";

//Request  approvemnet by patient
export const requestAppointment = async (req, res) => {
  try {
    const patientId = req.user._id;
    const { doctorId, date, time, reasonForVisit, appointmentType } = req.body;

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
      appointmentType: appointmentType || "physical",
    });

    await newAppointment.save();
    res
      .status(201)
      .json({ success: true, message: "Appointment requested successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while appointment booking.",
      Error: error?.message,
    });
  }
};

//approve appoinment by doctor
// export const approveAppointment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doctorId = req.user._id;

//     let token;
//     if (req.body?.tokenNo) token = req.body?.tokenNo || null;

//     const appointment = await Appointment.findById(id)
//     // .populate("doctorId");

//     if (!appointment) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Appointment not found." });
//     }

//     if (appointment.doctorId.toString() !== doctorId.toString()) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Unauthorized access." });
//     }

//     appointment.isApproved = true;
//     appointment.status = "scheduled";

//     // default token number
//     if (!token) {
//       const approvedCount = await Appointment.countDocuments({
//         doctorId,
//         date: appointment.date,
//         isApproved: true,
//       });
//       appointment.tokenNo = approvedCount + 1;
//     }

//     //token assign by doctor
//     else {
//       appointment.tokenNo = req.body.tokenNo;
//     }

//     const consultationTime = appointment.doctorId.consultationTime || 15;

//     const [hours, minutes] = appointment.time.split(":").map(Number);
//     const baseTime = new Date(appointment.date);
//     baseTime.setHours(hours, minutes, 0, 0);

//     appointment.estimatedVisitTime = new Date(
//       baseTime.getTime() + (appointment.tokenNo - 1) * consultationTime * 60000
//     );

//     await appointment.save();

//     res.status(200).json({
//       success: true,
//       message: "Appointment approved.",
//       data: appointment,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error while approve appointment .",
//       Error: error?.message,
//     });
//   }
// };

export const approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorId = req.user._id;

    let token;
    if (req.body?.tokenNo) token = req.body.tokenNo;

    // Populate doctor to get consultationTime
    const appointment = await Appointment.findById(id).populate("doctorId");

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    if (appointment.doctorId._id.toString() !== doctorId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access." });
    }

    appointment.isApproved = true;
    appointment.status = "scheduled";

    if (!token) {
      const approvedCount = await Appointment.countDocuments({
        doctorId,
        date: appointment.date,
        isApproved: true,
      });
      appointment.tokenNo = approvedCount + 1;
    } else {
      appointment.tokenNo = token;
    }

    // const consultationTime = appointment.doctorId.consultationTime || 15;

    const appointmentDate = new Date(appointment.date);
    const day = appointmentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const availabilityForDay = appointment.doctorId.availability.find(
      (a) => a.day === day
    );

    const consultationTime = availabilityForDay?.slotDuration || 15;

    const parseTime12h = (timeStr) => {
      let [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return { hours, minutes };
    };

    const start = appointment.time.split("-")[0].trim();

    const { hours, minutes } = parseTime12h(start);

    const baseTime = new Date(appointment.date);
    baseTime.setHours(hours, minutes, 0, 0);

    appointment.estimatedVisitTime = new Date(
      baseTime.getTime() +
        (appointment.tokenNo - 1) * consultationTime * 60 * 1000
    );

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment approved.",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while approving appointment.",
      error: error.message,
    });
  }
};

//to cancel or complete appoinment
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

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

    if (
      appointment.doctorId.toString() !== userId.toString() &&
      appointment.patientId.toString() !== userId.toString()
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access here" });
    }

    if (status === "completed" && appointment.isApproved) {
      appointment.status = "completed";
      appointment.note = req?.body?.note;
    }

    if (status === "canceled") {
      appointment.status = "canceled";
      appointment.cancelReason = `${req?.body?.cancelReason} - cancel By ${req.user.role}`;
    }

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment status updated.",
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while update status of appointment.",
      Error: error?.message,
    });
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
      rating: rating,
      comment,
    };
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Rating submitted successfully.",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while rate appointment.",
      error: error.message,
    });
  }
};

export const getAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required in the request parameters.",
      });
    }

    const appointmentDetails = await Appointment.findById(id)
      .populate("doctorId", "name profilePic specialization fees")
      .populate("patientId", "name profilePic");

    if (!appointmentDetails) {
      return res.status(404).json({
        success: false,
        message: "Appointment details not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: appointmentDetails,
    });
  } catch (error) {
    return res.status(statusCode).json({
      success: false,
      message: "error while fetch appointment by id",
      Error: error?.message,
    });
  }
};

export const trackAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    const doctorId = appointment.doctorId;
    const date = appointment.date;

    const completedAppointments = await Appointment.find({
      doctorId,
      date,
      status: { $in: ["completed"] },
    }).sort({ tokenNo: 1 });

    const currentToken = completedAppointments.length
      ? completedAppointments[completedAppointments.length - 1].tokenNo + 1
      : 1;

    const waitingPosition = appointment.tokenNo - currentToken;

    const doctor = await Doctor.findById(doctorId);
    const consultationTime = doctor?.consultationTime || 15;

    const waitingTimeMinutes =
      waitingPosition > 0 ? waitingPosition * consultationTime : 0;

    const estimatedVisitTime = new Date(
      Date.now() + waitingTimeMinutes * 60 * 1000
    );
    appointment.estimatedVisitTime = estimatedVisitTime;
    await appointment.save();

    return res.status(200).json({
      success: true,
      data: {
        appointmentId: appointment._id,
        estimatedVisitTime,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error tracking appointment",
      error: error.message,
    });
  }
};
