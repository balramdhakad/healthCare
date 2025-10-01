import express from "express";
import {
  getDoctorById,
  getTopRatedData,
  searchDoctors,
} from "../../controllers/healthCare/generalControllers.js";
import { getDoctorAvailability } from "../../controllers/healthCare/doctorControllers.js";

const router = express.Router();

router.get("/getdoctor/:id", getDoctorById);
router.get("/doctors", searchDoctors);
router.get('/top-rated', getTopRatedData);
router.get('/:id/availability', getDoctorAvailability);

export default router;
