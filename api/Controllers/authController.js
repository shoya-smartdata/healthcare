import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Doctor from '../Models/doctorSchema.js';
import Patient from '../Models/patientSchema.js';
import { sendEmail } from '../utils/mailer.js';

// Register (Doctor/Patient)
export const register = async (req, res) => {
  const { name, email, password, role, specialization } = req.body;

  try {
    // Check if user already exists
    const checkAlreadyUser = await Patient.findOne({ email });
    if (checkAlreadyUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'doctor') {
      // Register as Doctor
      const doctor = await Doctor.create({
        name,
        email,
        specialization,
        password: hashedPassword,
      });

      // Send welcome email to Doctor
      try {
        await sendEmail(
          email,
          'Welcome to Our Platform',
          `Hello Dr. ${name},\n\nYou have successfully registered as a doctor on our platform.\n\nBest regards,\nYour Company`
        );
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }

      return res.status(201).json({
        message: 'Doctor registered successfully',
        doctor,
      });
    } else {
      // Register as Patient
      const patient = await Patient.create({
        name,
        email,
        password: hashedPassword,
      });

      // Send welcome email to Patient
      try {
        await sendEmail(
          email,
          'Welcome to Our Platform',
          `Hello ${name},\n\nYou have successfully registered as a patient on our platform.\n\nBest regards,\nYour Company`
        );
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }

      return res.status(201).json({
        message: 'Patient registered successfully',
        patient,
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err });
  }
};

// Login for both Doctor and Patient
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user based on role
    const user = role === 'doctor'
      ? await Doctor.findOne({ email })
      : await Patient.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send login notification email
    try {
      await sendEmail(
        email,
        'Login Notification',
        `Hello ${user.name},\n\nYour account was accessed on our platform. If this was not you, please contact support immediately.\n\nBest regards,\nYour Company`
      );
    } catch (emailError) {
      console.error('Failed to send login notification email:', emailError);
    }

    res.json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
};
