import Consultation from "../Models/consultationSchema.js";
import Doctor from "../Models/doctorSchema.js";


export const viewRequests = async (req, res) => {
  const doctorId = req.user.id;  // id frm auth

  try {
    const consultations = await Consultation.findAll({ where: { doctorId }, include: ['Patient'] });
    res.json({ consultations });
  } catch (err) {
    res.status(500).json({ error: 'Failed  const ', err });
  }
};

// Update 
 export const updateStatus = async (req, res) => {
  const { consultationId, status } = req.body;

  try {
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) return res.status(404).json({ message: 'const not found' });

    consultation.status = status;
    await consultation.save();

    res.json({ message: 'const  updated', consultation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update ',  err });
  }
};

//  Availability
export const updateAvailability = async (req, res) => {
  const doctorId = req.user.id;
  const { availability } = req.body;

  try {
    const doctor = await Doctor.findByPk(doctorId);
    doctor.availability = availability;
    await doctor.save();

    res.json({ message: 'availabilty updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update availabilty ', details: err });
  }
};
