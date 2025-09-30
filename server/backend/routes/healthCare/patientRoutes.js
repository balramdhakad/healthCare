import express from "express";
import {
  createMedicalHistory,
  createPatientProfile,
  deleteMedicalHistory,
  getMedicalHistory,
  getMedicalHistoryById,
  getPatientAppointmentHistory,
  getPatientProfile,
  updateMedicalHistory,
  updatePatientProfile,
} from "../../controllers/healthCare/patientControllers.js";
import auth from "../../middlewares/authMiddleware.js";
import upload from "../../config/multer.js";

const router = express.Router();

//Profile Routes
router.get("/getProfile", auth("patient"),getPatientProfile);
router.post("/createPatientProfile", auth("patient"), upload.single("profilePic") ,createPatientProfile);
router.put("/updatePatientProfile", auth("patient"), upload.single("profilePic") ,updatePatientProfile);

//medical History
router.post("/medical-history", auth("patient"),upload.single("image") , createMedicalHistory);
router.get("/medical-history", auth("patient"), getMedicalHistory);
router.put("/medical-history/:id", auth("patient"),upload.single("image") , updateMedicalHistory);
router.delete("/medical-history/:id", auth("patient"), deleteMedicalHistory);
router.get("/medical-history/:id", auth("patient"), getMedicalHistoryById);

//get Appointment History
router.get("/appointment", auth("patient"), getPatientAppointmentHistory);

export default router;
