import express from "express";
import auth from "../../middlewares/authMiddleware.js";
import {
  approveAppointment,
  getAppointmentDetails,
  requestAppointment,
  submitAppointmentRating,
  trackAppointment,
  updateAppointmentStatus,
} from "../../controllers/healthCare/appointmentControllers.js";

const router = express.Router();

router.post("/book", auth("patient"), requestAppointment);
router.put("/:id", auth("doctor"), updateAppointmentStatus);
router.get("/:id", auth("patient","doctor"), getAppointmentDetails);
router.get("/:id/track", auth("patient","doctor"), trackAppointment);
router.put("/:id/approve", auth("doctor"), approveAppointment);
router.put("/:id/rate", auth("patient"), submitAppointmentRating);

export default router;
