import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailSuccess = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const email = urlParams.get('email');
    
      if (token && email) {
        try {
          // Make the GET request to the backend API for email verification
          const response = await axios.get(`http://localhost:3031/api/auth/verify-email`, {
            params: { token, email }, // Pass token and email as query parameters
          });
    
          console.log('Verification response:', response);
    
          if (response.status === 200 && response.data.success === true) {
            setVerificationStatus('Email verified successfully! Redirecting to login...');
            setTimeout(() => {
              navigate('/login');
            }, 3000); // Redirect after 3 seconds
          } else {
            setVerificationStatus('Verification is under process. Please wait...');
          }
        } catch (error) {
          console.error('Verification error:', error);
        }
      } 
      setIsLoading(false); // Stop loading once the process is complete
    };
    

    verifyEmail();
  }, [navigate]);
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-lg w-full">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Email Verification</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V2a10 10 0 1 0 10 10h-2a8 8 0 0 1-8 8v-2a6 6 0 0 0-6-6z"></path>
            </svg>
          </div>
        ) : (
          <p className="text-lg text-gray-700">{verificationStatus}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;
