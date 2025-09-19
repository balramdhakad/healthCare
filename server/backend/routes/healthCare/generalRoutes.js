import express from "express";
import {
  getDoctorById,
  getTopRatedDoctors,
  searchDoctors,
} from "../../controllers/healthCare/generalControllers.js";

const router = express.Router();

router.get("/getdoctor/:id", getDoctorById);
router.get("/doctors", searchDoctors);
router.get('/top-rated', getTopRatedDoctors);

export default router;
