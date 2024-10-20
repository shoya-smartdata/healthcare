import Consultation from '../Models/consultationSchema.js';
import Doctor from '../Models/doctorSchema.js';


export const doctorData = async (req, res)=>{
   
   try {

    const data = await Doctor.findAll();

    res.status(201).json({
      message: "dr fetched successfully !",
      data
    })
    
   } catch (error) {
    res.status(400).json({
      error: "unablle to get data !"
    })
   } 
}


// Request a Consultation
export const requestConsultation = async (req, res) => {
    const { doctorId, timeSlot } = req.body;
    const patientId = req.user.id; 
  
    try {
   
      if (!req.file) {
        return res.status(400).json({ error: 'Please upload  skin prblm.' });
      }
  
      if (!doctorId || !timeSlot) {
        return res.status(400).json({ error: 'Doctor slote require' });
      }
  
      const consultation = await Consultation.create({
        doctorId,
        patientId,
        timeSlot,
        skinImage: req.file.path, 
      });
  
      console.log(consultation);
  
      res.status(201).json({ consultation });
    } catch (err) {
      console.error('Error details:', err);
      res.status(500).json({ error: 'Request failed', details: err.message });
    }
  };
  
  
// Track Consultation Status
export const trackStatus = async (req, res) => {
  const { consultationId } = req.params;

  try {
    const consultation = await Consultation.findByPk(consultationId);
    
    if (!consultation) {
      return res.status(404).json({ message: 'cosnt not found' });
    }

    res.json({ status: consultation.status });
  } catch (err) {
    res.status(500).json({ error: 'traking faild !', details: err.message });
  }
};
