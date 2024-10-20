// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <nav className="bg-blue-500 shadow-lg  w-full "> {/* Change here */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-white tracking-wide">
          <Link to="/" className="hover:text-yellow-300">Skincare Consult</Link>
        </div>

        {/* Menu for desktop */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Hamburger button for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-blue-500 px-4 py-4 space-y-4"> {/* Change here */}
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
