import express from 'express';
import sequelize from './config/db.js';
import authRoutes from './Routes/authRoutes.js';
import patientRoutes from './Routes/patientRoutes.js';
import doctorRoutes from './Routes/docterRoutes.js';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow frontend app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow credentials if needed
};

// Middleware setup
app.use(express.json());

// Apply CORS globally
app.use(cors(corsOptions));

// Serve static files from /uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from /drimages directory with CORS
app.use('/drimages', cors(corsOptions), express.static(path.join(__dirname, 'drimages')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);

// Database Sync
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('db connected and sync model');

    const PORT = process.env.PORT || 3031;  // Use the correct port
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('db connection failed', err);
  }
};

// Start server
startServer();
