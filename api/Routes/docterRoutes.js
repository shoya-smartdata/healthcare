import express from 'express';
import {  updateAvailability, updateStatus, viewRequests } from '../Controllers/doctorController.js';

import authMiddleware from '../Middleware/authMiddleware.js'

const router = express.Router();

router.get('/requests', authMiddleware, viewRequests);
router.put('/consultation/status', authMiddleware, updateStatus);
router.put('/availability', authMiddleware, updateAvailability);

export default router;
