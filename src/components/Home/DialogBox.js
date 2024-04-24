import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

function DialogBox({ onClose }) {
  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  return (
    <div className="fixed bottom-20 left-4 z-50 bg-white text-red-600 shadow-lg rounded-lg p-4">
      <div className="flex justify-between">
        <button
          onClick={handleClose}
          className="text-red-600 hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pb-1 pr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-16" /> {/* Adjust height as needed */}
      </div>
      <p className="text-center mt-4 text-black">You are not logged in. Login or Register</p>
      <div className="mt-4 flex gap-4">
        <Link
          to="/login"
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default DialogBox;
