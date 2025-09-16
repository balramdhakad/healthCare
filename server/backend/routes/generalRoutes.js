import express from "express";
import {
  getDoctorById,
  searchDoctors,
} from "../controllers/generalControllers.js";

const router = express.Router();

router.post("/getdoctor", getDoctorById);
router.get("/doctors", searchDoctors);
// router.get('/top-rated', getTopRatedDoctors);

export default router;
