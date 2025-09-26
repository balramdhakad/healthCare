import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    diagnosisDate: {
      type: Date,
      required: true,
    },
    treatment: {
      type: String,
    },
    notes: {
      type: String,
    },

    doctorName: {
      type: String,
    },
    image : {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);
export default MedicalHistory;
