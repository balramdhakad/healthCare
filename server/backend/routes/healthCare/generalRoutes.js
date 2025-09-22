import express from "express";
import {
  getDoctorById,
  getTopRatedData,
  searchDoctors,
} from "../../controllers/healthCare/generalControllers.js";

const router = express.Router();

router.get("/getdoctor/:id", getDoctorById);
router.get("/doctors", searchDoctors);
router.get('/top-rated', getTopRatedData);

export default router;
