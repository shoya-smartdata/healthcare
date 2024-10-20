import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Doctor from '../Models/doctorSchema.js';
import Patient from '../Models/patientSchema.js';



// Register (Doctor/Patient)
export const register = async (req, res) => {
  const { name, email, password, role, specialization } = req.body;

  try {

  const checkAlreadyUser = await Patient.findOne({email: {email}});
  if(!checkAlreadyUser){
   res.status(400).json({message: "email already exists !"})
    
  }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'doctor') {
      const doctor = await Doctor.create({
        name,
        email,
        specialization,
        password: hashedPassword,
      });
      res.status(201).json({ message: 'dr registered successfully',
        doctor
       });
    } else {
      const patient = await Patient.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: 'ptaint registered  done...............',
        patient
       });
    }
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', err });
  }
};

// dono ke lie same 
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = role === 'doctor' 
      ? await Doctor.findOne({ where: { email } }) 
      : await Patient.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: 'Invalid entry ' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid entry' });

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: "User logged in successfully",
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
};
