import mongoose from "mongoose";


const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  ratedAt: {
    type: Date,
    default: Date.now,
  },
});



const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["scheduled", "completed", "canceled"],
      default: "scheduled",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    reasonForVisit: {
      type: String,
    },

    tokenNo: {
      type: Number,
    },

    rating: {
      type: ratingSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
