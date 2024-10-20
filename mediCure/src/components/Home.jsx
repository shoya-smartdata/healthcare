// pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctor data on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/patient/doctors'); // Your API endpoint
        console.log("Fetched doctors:", response.data.data); // Log the fetched data
        setDoctors(response.data.data); // Set the fetched doctors in state
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Skincare Consult</h1>
      <p className="text-center mb-8">
        Consult with our expert dermatologists for all your skincare needs.
      </p>

      {/* Display doctor data when ready */}
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
              <h3 className="text-lg font-bold mb-2">{doctor.name}</h3>
              <p className="text-gray-700">Specialization: {doctor.specialization}</p>
              <p className="text-gray-700">Availability: {doctor.availability}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Loading doctors...</p>
      )}

      
    </div>
  );
};

export default Home;
