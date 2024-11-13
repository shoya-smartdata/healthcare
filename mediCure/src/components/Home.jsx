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
        const response = await axios.get('http://localhost:3031/api/patient/doctors');
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 bg-cover bg-fixed relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div> 
      
      <div className="relative container mx-auto px-4 py-12 text-white z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold animate__animated animate__fadeIn animate__delay-1s">
            Welcome to Skincare Consult
          </h1>
          <p className="mt-4 text-lg font-light animate__animated animate__fadeIn animate__delay-2s">
            Consult with our expert dermatologists for all your skincare needs.
          </p>
          
        </div>

        {/* Doctors Section */}
        <h2 className="text-4xl font-semibold text-center text-white mb-8 animate__animated animate__fadeIn animate__delay-3s">
          Meet Our Doctors
        </h2>
        
        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map(doctor => (
              <div key={doctor.id} className="relative cursor-pointer">
                <Card 
                  doctor={doctor} 
                  onBookAppointment={handleBookAppointment} 
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300">Loading doctors...</p>
        )}
      </div>

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
