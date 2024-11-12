// components/ConsultationRequestForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ConsultationRequestForm = ({ doctorId, onClose }) => {
  const [timeSlot, setTimeSlot] = useState('');
  const [skinImage, setSkinImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('')

  const handleFileChange = (event) => {
    setSkinImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!doctorId || !timeSlot || !reason || !skinImage) {
      setError('Please fill all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('doctorId', doctorId);
    formData.append('timeSlot', timeSlot);
    formData.append('skinImage', skinImage);
    formData.append('reason', reason);
    formData.append('description', description);

    try {
      const response = await axios.post(`http://localhost:3030/api/patient/consultation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });

  
      setSuccess('Consultation request submitted successfully!');
      setError('');
      onClose(); // Close the form after submission
    } catch (err) {
      setError('Failed to request consultation. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Request a Consultation</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="timeSlot" className="block text-gray-700">Select Time Slot:</label>
          <input
            type="datetime-local"
            id="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700">Reason :</label>
          <input
            type="txt"
            id="reason"
            onChange={(e)=> setReason(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description :</label>
          <input
            type="txt"
            id="description"
            onChange={(e)=> setDescription(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skinImage" className="block text-gray-700">Upload Skin Image:</label>
          <input
            type="file"
            id="skinImage"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Request
        </button>
        <button
          type="button"
          onClick={onClose} // Close the form without submitting
          className="mt-2 text-gray-500 hover:text-gray-800"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ConsultationRequestForm;
