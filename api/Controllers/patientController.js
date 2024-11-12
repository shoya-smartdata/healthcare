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
  const { doctorId, timeSlot, reason,description } = req.body;
  const patientId = req.user.id; 

  try {
      if (!req.file) {
          return res.status(400).json({ error: 'Please upload skin problem.' });
      }

      if (!doctorId || !timeSlot) {
          return res.status(400).json({ error: 'Doctor slot required' });
      }

      const consultation = await Consultation.create({
          DoctorId: doctorId, 
          PatientId: patientId, 
          timeSlot,
          reason,
          description,
          skinImage: req.file.path,
      });

  

      res.status(201).json({ consultation });
  } catch (err) {
      console.error('Error details:', err);
      res.status(500).json({ error: 'Request failed', details: err.message });
  }
};

  

export const trackStatus = async (req, res) => {
  const { consultationId } = req.params;

  try {
    const consultation = await Consultation.findByPk(consultationId);

  
    console.log('Consultation:', consultation);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }


    res.json({ status: consultation.status });
  } catch (err) {
    console.error('Tracking error:', err); 
    res.status(500).json({ error: 'Tracking failed!', details: err.message });
  }
};


//get all consultant 


export const getPatientConsultations = async (req, res) => {
  const patientId = req.user.id; 
  try {
    const consultations = await Consultation.findAll({
      where: { PatientId: patientId },
      include: [
        {
          model: Doctor,
          attributes: ['name', 'availability'],  // Fetch only the name field of the doctor
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
