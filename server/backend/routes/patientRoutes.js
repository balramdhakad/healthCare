import express from "express";
import {
  createMedicalHistory,
  createPatientProfile,
  getMedicalHistory,
  getPatientAppointmentHistory,
  getPatientProfile,
  updatePatientProfile,
} from "../controllers/patientControllers.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

//Profile Routes
router.get("/getProfile", auth("patient"), getPatientProfile);
router.post("/createPatientProfile", auth("patient"), createPatientProfile);
router.put("/updatePatientProfile", auth("patient"), updatePatientProfile);

//medical History
router.post("/medical-history", auth("patient"), createMedicalHistory);
router.get("/medical-history", auth("patient"), getMedicalHistory);

//get Appointment History
router.get("/appointment", auth("patient"), getPatientAppointmentHistory);

export default router;
