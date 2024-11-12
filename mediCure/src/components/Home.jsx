// pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

import ConsultationRequestForm from '../pages/ConsultationRequestForm';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch doctor data on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/patient/doctors');
        setDoctors(response.data.data);
        console.log(response.data.data);
        
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowForm(true); // Show the consultation form
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDoctorId(null); // Reset selected doctor
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Skincare Consult</h1>
      <p className="text-center mb-8">
        Consult with our expert dermatologists for all your skincare needs.
      </p>

      {/* Display doctor data */}
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <Card 
              key={doctor.id} 
              doctor={doctor} 
              onBookAppointment={handleBookAppointment} // Pass the handler to Card
            />
          ))}
        </div>
      ) : (
        <p className="text-center">Loading doctors...</p>
      )}

      {/* Show consultation request form if a doctor is selected */}
      {showForm && (
        <ConsultationRequestForm 
          doctorId={selectedDoctorId} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
};

export default Home;
