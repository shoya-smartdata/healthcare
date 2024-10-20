// pages/Dashboard.js
import React, { useState } from 'react';

const Dashboard = () => {
  const [role, setRole] = useState('patient'); // Toggle between 'patient' and 'doctor'

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Role Switcher */}
      <div className="mb-4">
        <button
          className={`mr-2 py-2 px-4 rounded-lg ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setRole('patient')}
        >
          Patient Dashboard
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setRole('doctor')}
        >
          Doctor Dashboard
        </button>
      </div>

      {/* Conditional rendering based on role */}
      {role === 'patient' ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Consultation Requests</h2>
          <p>No consultation requests at the moment.</p>
          {/* Add cards or tables to list patient requests */}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Incoming Consultation Requests</h2>
          <p>No new consultation requests for now.</p>
          {/* Add cards or tables to list doctor requests */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
