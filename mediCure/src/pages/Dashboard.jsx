import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StatusUpdateModal from '../components/StatusUpdateModal';

const Dashboard = () => {
  // Load role from localStorage on component mount
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem('role');
    console.log('Loaded role from localStorage:', storedRole); // Debug log
    return storedRole || 'patient';  // Default to 'patient' if no role is found
  });
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState(''); // Rest

  useEffect(() => {
    console.log('Current role:', role);
    if (role === 'doctor') {
      fetchDoctorConsultations();
    } else if (role === 'patient') {
      fetchPatientConsultations();
    }
  }, [role]);  

  const fetchDoctorConsultations = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3031/api/doctor/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data" , response.data);
      setConsultations(response.data.consultations);
   
      
    } catch (err) {
      setError('Failed to load consultation requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientConsultations = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
    
      const response = await axios.get('http://localhost:3031/api/patient/allConstultant', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      
      setConsultations(response.data.consultations);
    } catch (err) {
      setError('Failed to load consultations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdateClick = (consultationId) => {
    setSelectedConsultationId(consultationId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConsultationId(null);
  };

  const handleUpdateStatus = async (consultationId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3031/api/doctor/consultation/status', {
        consultationId,
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh consultations after updating status
      if (role === 'doctor') {
        fetchDoctorConsultations();
      } else {
        fetchPatientConsultations();
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    }
  };

  console.log("hello", consultations);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Conditional rendering based on role */}
        {role === 'patient' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Consultation Requests</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : consultations.length === 0 ? (
              <p>No consultation requests at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {consultations.map((consultation) => (
                  <div key={consultation.id} className="bg-white p-6 shadow-lg rounded-lg transition-all hover:shadow-xl">
                    <p><strong>Doctor:</strong> {consultation.Doctor.name}</p>
                    <p><strong>Time Slot:</strong> {new Date(consultation.timeSlot).toLocaleString()}</p>
                    <p><strong>Status:</strong> {consultation.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Incoming Consultation Requests</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : consultations.length === 0 ? (
              <p>No consultation requests at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {consultations.map((consultation) => (
                  <div key={consultation.id} className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-start transition-all hover:shadow-xl">
                    {/* Left side (Patient data) */}
                    <div className="w-2/3">
                      <p><strong>Patient:</strong> {consultation.Patient.name} ({consultation.Patient.email})</p>
                      <p><strong>Time Slot:</strong> {new Date(consultation.timeSlot).toLocaleString()}</p>
                      <p><strong>Status:</strong> {consultation.status}</p>
                      <p><strong>Appointment:</strong> {consultation.appointment}</p>
                      <p><strong>Reason:</strong> {consultation.reason}</p>
                      <p><strong>Description:</strong> {consultation.description}</p>
            
                      {/* Update Status Button */}
                      <button
                        className="bg-green-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-green-700 transition duration-300"
                        onClick={() => handleStatusUpdateClick(consultation.id)}
                      >
                        Update Status
                      </button>
                    </div>
            
                    {/* Right side (Image) */}
                    <div className="w-1/3 bg-gray-100 p-2 rounded-lg">
                      <p className="mb-2 text-center font-semibold">Image:</p>
                      <img
                        src={`http://localhost:3031/${consultation.skinImage}`}
                        alt="Consultation Image"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <StatusUpdateModal
          consultationId={selectedConsultationId}
          onClose={handleCloseModal}
          onSubmit={handleUpdateStatus}
        />
      )}
    </>
  );
};

export default Dashboard;
