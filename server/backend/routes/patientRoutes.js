import express from "express";
import {
    createMedicalHistory,
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
} from "../controllers/patientControllers.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getProfile", auth("patient"), getPatientProfile);
router.post("/createPatientProfile", auth("patient") , createPatientProfile);
router.put("/updatePatientProfile", auth("patient"), updatePatientProfile);

//add medical History
router.post('/medical-history', auth("patient"), createMedicalHistory);

export default router;
