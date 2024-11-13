import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Doctor from "../Models/doctorSchema.js";
import Patient from "../Models/patientSchema.js";
import Mailer from "../utils/Mailer.js";
import crypto from "crypto";

// Register (Doctor/Patient)
export const register = async (req, res) => {
  const { name, email, password, role, specialization } = req.body;
  
  try {
    const checkAlreadyUser =
      (await Patient.findOne({ where: { email } })) ||
      (await Doctor.findOne({ where: { email } }));
    
    if (checkAlreadyUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    let user;
    if (role === "doctor") {
      user = await Doctor.create({
        name,
        email,
        specialization,
        drImage: req.file.path, // Saving the file path to the database
        password: hashedPassword,
        verified: false,
        verificationToken,
      });
    } else {
      user = await Patient.create({
        name,
        email,
        password: hashedPassword,
        verified: false,
        verificationToken,
      });
    }

    const verificationLink = `${process.env.CLIENT_URL}/verify?token=${verificationToken}&email=${email}`;
    await Mailer(
      email,
      "Email Verification",
      `<p>Please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>`
    );

    res.status(201).json({
      message: "Registration successful. Please verify your email to log in.",
      user,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed", details: err });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  const { token, email } = req.query;

  if (!token || !email) {
    return res.status(400).json({ message: "Missing token or email." });
  }

  try {
    let user =
      (await Patient.findOne({ where: { email, verificationToken: token } })) ||
      (await Doctor.findOne({ where: { email, verificationToken: token } }));

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token." });
    }

    await user.update({
      verified: true,
      verificationToken: null,
    });

    res.status(200).json({ success: true, message: "Email verified successfully." });
  } catch (err) {
    console.error("Error during verification:", err);
    res.status(500).json({ error: "Verification failed", details: err.message });
  }
};

// Login (Doctor/Patient)
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user =
      role === "doctor"
        ? await Doctor.findOne({ where: { email } })
        : await Patient.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "Invalid entry" });
    if (!user.verified)
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
