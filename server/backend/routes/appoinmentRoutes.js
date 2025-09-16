import express from 'express';
import auth from '../middlewares/authMiddleware.js'; 
import { approveAppointment, requestAppointment, submitAppointmentRating, updateAppointmentStatus } from '../controllers/appointmentControllers.js';

const router = express.Router();

router.post('/book', auth('patient'), requestAppointment);
router.put('/:id/approve', auth('doctor'), approveAppointment);
router.put('/:id', auth('doctor'), updateAppointmentStatus);
router.put('/:id/rate', auth('patient'), submitAppointmentRating);

export default router;