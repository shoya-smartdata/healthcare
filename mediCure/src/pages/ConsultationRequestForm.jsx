import React, { useState } from 'react';
import axios from 'axios';

const ConsultationRequestForm = ({ doctorId, onClose }) => {
  const [timeSlot, setTimeSlot] = useState('');
  const [skinImages, setSkinImages] = useState([]); // Handle multiple images
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    setSkinImages(event.target.files); // Update with all selected files
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!doctorId || !timeSlot || !reason || !skinImages.length) { // Check for multiple images
      setError('Please fill all fields and upload at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('doctorId', doctorId);
    formData.append('timeSlot', timeSlot);
    formData.append('reason', reason);
    formData.append('description', description);

    // Append each image file to FormData
    Array.from(skinImages).forEach((file) => {
      formData.append('skinImage', file); // Appends each file to the 'skinImage' field
    });

    try {
      const response = await axios.post(`http://localhost:3031/api/patient/consultation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });

      setSuccess('Consultation request submitted successfully!');
      setError('');
      onClose();
    } catch (err) {
      setError('Failed to request consultation. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4">Request a Consultation</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description :</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="skinImage" className="block text-gray-700">Upload Skin Images:</label>
            <input
              type="file"
              id="skinImage"
              onChange={handleFileChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
              multiple // Allow multiple file selection
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
            onClick={onClose}
            className="mt-2 text-gray-500 hover:text-gray-800 ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationRequestForm;
