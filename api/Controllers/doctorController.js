import Consultation from "../Models/consultationSchema.js";
import Doctor from "../Models/doctorSchema.js";

// View consultation requests for a doctor
export const viewRequests = async (req, res) => {
  const doctorId = req.user.id;  // Extract the doctor ID from authenticated user

  try {
    const consultations = await Consultation.findAll({ 
      where: { doctorId }, 
      include: ['Patient'] 
    });
    res.json({ consultations });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load consultation requests', err });
  }
};

// Update consultation status
export const updateStatus = async (req, res) => {
  const { consultationId, status } = req.body;

  try {
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) return res.status(404).json({ message: 'Consultation not found' });

    consultation.status = status;
    await consultation.save();

    res.json({ message: 'Consultation updated', consultation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update consultation', err });
  }
};

// Update doctor's availability
export const updateAvailability = async (req, res) => {
  const doctorId = req.user.id; // Extract doctor ID from auth
  const { availability } = req.body; // New availability to update

  try {
    const doctor = await Doctor.findByPk(doctorId); // Find the doctor by ID
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.availability = availability; // Update the availability field
    await doctor.save(); // Save changes

    res.json({ message: 'Doctor availability updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update doctor availability', err });
  }
};
