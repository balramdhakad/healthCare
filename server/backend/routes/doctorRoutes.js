import express from 'express';
import auth from '../middlewares/authMiddleware.js'; 
import { createDoctorProfile ,updateDoctorProfile ,getProfile, getTodayAppointments, getDoctorAppointmentHistory} from '../controllers/doctorControllers.js';

const router = express.Router();

//doctor Profile Routes
router.post('/profile', auth('doctor'), createDoctorProfile);
router.put('/profile', auth('doctor'), updateDoctorProfile);
router.get('/profile', auth('doctor'), getProfile);

//getAll appointment history
router.get('/history', auth('doctor'), getDoctorAppointmentHistory);

//get Today's appointment
router.get('/today', auth('doctor'), getTodayAppointments);

export default router;