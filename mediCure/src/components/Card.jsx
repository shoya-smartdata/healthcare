// components/Card.js
import React from 'react';

const Card = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl w-80 h-96"> 
      <div className="p-4 flex flex-col h-full">
      
        <div className="h-32 bg-gray-200 rounded mb-4 flex justify-center items-center">
          <img
               src={"https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              // Use default image if no image available
            alt={doctor.name}
            className="object-cover h-full w-full rounded"
          />
        </div>
        <h3 className="text-lg text-gray-800 font-bold mb-2">{doctor.name}</h3>
        <p className="text-gray-700">Specialization: {doctor.specialization}</p>
        <p className="text-gray-700">Availability: {doctor.availability}</p>
        {/* Button to book an appointment */}
        <button
          className="mt-auto bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => onBookAppointment(doctor.id)} // Pass the doctor ID when booking
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default Card;
