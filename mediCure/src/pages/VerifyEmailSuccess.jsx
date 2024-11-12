import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailSuccess = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...'); // Message state

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const email = urlParams.get('email');

      if (token && email) {
        try {
          const response = await axios.get(`http://localhost:3030/api/auth/verify-email`, {
            params: { token, email }
          });

          setVerificationStatus('Email verified successfully! Redirecting to login...');

          // After a delay, redirect to login
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } catch (error) {
          setVerificationStatus('Verification failed. Token may be invalid or expired.');
        }
      } else {
        setVerificationStatus('Verification failed. Missing token or email.');
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
        <p className="text-gray-700">{verificationStatus}</p>
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;
