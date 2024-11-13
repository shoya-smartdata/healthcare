import express from "express";
import { register, login, verifyEmail } from "../Controllers/authController.js";
import drupload from "../Middleware/multerdrImages.js"

const router = express.Router();

router.post('/register', drupload.single('drImage'),  register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);

export default router;
