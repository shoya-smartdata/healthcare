import express from 'express';
import upload from '../Middleware/multerConfig.js';
import { doctorData, getPatientConsultations, requestConsultation, trackStatus } from '../Controllers/patientController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

// counsltant  data 
router.post('/consultation', authMiddleware, upload.single('skinImage'), requestConsultation);

router.get('/doctors',  doctorData);
router.get('/consultation/:consultationId/status', authMiddleware, trackStatus);
router.get('/allConstultant', authMiddleware, getPatientConsultations)


export default router;
