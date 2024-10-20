// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">© 2024 Skincare Consult</div>
        <div className="space-x-4">
          <a href="/about" className="hover:text-gray-400 transition duration-300">About Us</a>
          <a href="/contact" className="hover:text-gray-400 transition duration-300">Contact</a>
          <a href="/privacy" className="hover:text-gray-400 transition duration-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
