import React, { useEffect, useState } from 'react';

const AccountCreated = () => {
  const [isLoading, setIsLoading] = useState(true); // State to control loading status

  useEffect(() => {
    // Simulate loading (e.g., waiting for API response)
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the loader after 2 seconds
    }, 2000); // Adjust the delay to your needs

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-white"> {/* Changed background to white */}
      <div className="text-center p-10 rounded-lg bg-gray-100 shadow-lg max-w-md mx-auto"> {/* Lighter background for content */}
        {isLoading ? (
          // Loader animation (spinner)
          <div className="flex justify-center items-center mb-6">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          // Success message after loading
          <div>
            <div className="text-4xl font-bold text-gray-800 mb-6">
              Success!
            </div>
            <p className="text-lg text-gray-700 font-semibold mb-4">
              Your account has been created successfully. 
              <br />
              To log in, please verify your email. Check your inbox!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountCreated;
