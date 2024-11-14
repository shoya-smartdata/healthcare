import React, { useState } from 'react';

const StatusUpdateModal = ({ consultationId, onClose, onSubmit }) => {
  const [status, setStatus] = useState('');
  const [appointment, setAppointment] = useState('appointment will be updated by doctor!');
  const [availability, setAvailability] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(consultationId, status, availability);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Update Consultation Status and Availability</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="status">New Status</label>
            <select
              id="status"
              className="block w-full border border-gray-300 rounded-lg p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="availability">Set Availability</label>
            <select
              id="availability"
              className="block w-full border border-gray-300 rounded-lg p-2"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            >
              <option value="">Select Availability</option>
              <option value="09:00-10:00 am">09:00-10:00 am</option>
              <option value="10:00-11:00 am">10:00-11:00 am</option>
              <option value="11:00-12:00 noon">11:00-12:00 noon</option>
              <option value="12:00-01:00 pm">12:00-01:00 pm</option>
              <option value="01:00-02:00 pm">01:00-02:00 pm</option>
              <option value="03:00-04:00 pm">03:00-04:00 pm</option>
              <option value="04:00-05:00 pm">04:00-05:00 pm</option>
              <option value="--:--">--:--</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
