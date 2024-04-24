import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import signupImage from "../../assets/signup.jpeg"; // Import the image

const handleGoogleAuth = () => {
  window.location.href = `${process.env.REACT_APP_RENDER_URL}/auth/google`;
};

const SignupPage = () => {
  const [userData, setUserData] = useState(null);

  // Fetch user data after component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/auth/google/callback");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gray-100"
      style={{
        backgroundImage: `url(${signupImage})`, // Use imported image here
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link to="/">
        <ArrowBackIcon
          className="absolute top-6 left-6 text-white"
          style={{ fontSize: 32 }}
        />
      </Link>
      <div className="max-w-md w-full my-auto mx-auto p-8 bg-white rounded-md shadow-md mb-24 opacity-95">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h2>

        <div className="mb-4">
          <button
            onClick={handleGoogleAuth}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign up with Google
          </button>
          <Link to="/register" className="w-full">
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
              Sign up manually
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
