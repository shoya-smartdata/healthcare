// components/Card.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl w-80"
          >
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{doctor.name}</h3>
              <p className="text-gray-700">Specialization: {doctor.specialization}</p>
              <p className="text-gray-700">Availability: {doctor.availability}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

export default Card;
