import express from 'express';
import upload from '../Middleware/multerConfig.js';
import { doctorData, requestConsultation, trackStatus } from '../Controllers/patientController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();


router.post('/consultation', authMiddleware, upload.single('images'), requestConsultation);

router.get('/doctors',  doctorData);
router.get('/consultation/:consultationId/status', authMiddleware, trackStatus);

export default router;
