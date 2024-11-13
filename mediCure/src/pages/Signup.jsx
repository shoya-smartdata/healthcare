import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient', // Default role is 'patient'
    specialization: '',
    drImage: '', // Only relevant if role is 'doctor'
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('role', form.role);

      // Append additional fields if role is 'doctor'
      if (form.role === 'doctor') {
        formData.append('specialization', form.specialization);
        formData.append('drImage', form.drImage); // Ensure the file is correctly appended
      }

      const response = await axios.post('http://localhost:3031/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set to multipart/form-data for file upload
        },
      });

      toast.success('User registered successfully!');
      navigate('/verify-mail');
      console.log('User registered successfully:', response.data);

    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
      toast.error("Unable to register");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 bg-cover bg-fixed relative">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative container mx-auto px-4 py-12 text-white z-10 w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Input */}
              <div>
                <label className="block text-gray-700 text-sm mb-1">Name</label>
                <input
                  type="text"
                  className="w-full  text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-gray-700 text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border  text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 text-sm mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-gray-700 text-sm mb-1">Role</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"  // Text color added here
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              {/* Conditionally render Specialization and Dr-Image input when the role is 'Doctor' */}
              {form.role === 'doctor' && (
                <>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">Specialization</label>
                    <input
                      type="text"
                      className="w-full  text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={form.specialization}
                      onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-1">Dr-Image</label>
                    <input
                      type="file"
                      className="w-full  text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={(e) => setForm({ ...form, drImage: e.target.files[0] })}
                      required
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 mt-4"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
