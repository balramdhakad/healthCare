import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    slotDuration: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },

    mobileNo : {
      type : Number
    },

    name: {
      type: String,
    },

    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },

    verified: {
      type: Boolean,
      required: true,
      default: false,
    },

    //TODO :: after multer implementation
    profilePic: {
      type: String,
    },

    communities : [],

    availability: [availabilitySchema],
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
