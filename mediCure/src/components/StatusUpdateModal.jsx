import React, { useState } from 'react';

const StatusUpdateModal = ({ consultationId, onClose, onSubmit }) => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(consultationId, status);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Update Consultation Status</h2>
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
            </select>
            <label> set Appoiment  </label>
            <input type='time' placeholder='updated time !'/>
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
