// pages/Login.js
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use Link to navigate to Signup
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'patient' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form refresh
  
    try {
      const response = await axios.post("http://localhost:3031/api/auth/login", form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Successfully logged in", response.data);
  
      // Save token and role in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', form.role); // Store the role (patient/doctor)
  
      toast.success("Successfully logged in!");
  
      // Redirect to dashboard
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Login failed", error.response ? error.response.data : error.message);
  
      // Show error toast if login fails
      toast.error("Login failed. Please check your credentials.");
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 bg-cover bg-fixed relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div> 

      <div className="relative container mx-auto px-4 py-12 text-white z-10 w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full  text-gray-800 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">Password</label>
              <input
                type="password"
                className="w-full  text-gray-800 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">Role</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"  // Text color added here
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Login
            </button>
          </form>

          {/* Add signup link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            New user? <Link to="/signup" className="text-blue-500 hover:underline">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
