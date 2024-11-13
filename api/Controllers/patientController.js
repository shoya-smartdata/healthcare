import Consultation from '../Models/consultationSchema.js';
import Doctor from '../Models/doctorSchema.js';

// Fetch all doctors
export const doctorData = async (req, res) => {
   try {
      const data = await Doctor.findAll();

      res.status(201).json({
        message: "Doctors fetched successfully!",
        data
      });
   } catch (error) {
      res.status(400).json({
        error: "Unable to get doctor data!"
      });
   }
}

// Request a Consultation (with multiple file uploads)
export const requestConsultation = async (req, res) => {
  const { doctorId, timeSlot, reason, description } = req.body;
  const patientId = req.user.id;

  try {
    // Ensure that at least one file is uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one skin problem image.' });
    }

    // Ensure that necessary fields are provided
    if (!doctorId || !timeSlot || !reason) {
      return res.status(400).json({ error: 'Doctor ID, time slot, and reason are required.' });
    }

    // Prepare the file paths to store in the consultation record
    const skinImages = req.files.map(file => file.path);

    // Create a new consultation record
    const consultation = await Consultation.create({
      DoctorId: doctorId,
      PatientId: patientId,
      timeSlot,
      reason,
      description,
      skinImage: skinImages,  // Store an array of image paths
    });

    res.status(201).json({
      message: 'Consultation request submitted successfully!',
      consultation
    });
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json({ error: 'Request failed', details: err.message });
  }
};

// Track the status of a consultation
export const trackStatus = async (req, res) => {
  const { consultationId } = req.params;

  try {
    const consultation = await Consultation.findByPk(consultationId);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.json({ status: consultation.status });
  } catch (err) {
    console.error('Tracking error:', err);
    res.status(500).json({ error: 'Tracking failed!', details: err.message });
  }
};

// Get all consultations for a patient
export const getPatientConsultations = async (req, res) => {
  const patientId = req.user.id;

  try {
    const consultations = await Consultation.findAll({
      where: { PatientId: patientId },
      include: [
        {
          model: Doctor,
          attributes: ['name', 'availability'],  // Include the doctor's name and availability
        },
      ]
    });

    if (!consultations || consultations.length === 0) {
      return res.status(404).json({ message: 'No consultations found.' });
    }

    res.json({ consultations });
  } catch (err) {
    console.error('Error fetching consultations:', err);
    res.status(500).json({ error: 'Failed to fetch consultations', details: err.message });
  }
};
