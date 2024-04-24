import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useDispatch } from "react-redux";
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
  SET_ROLE,
} from "../../redux/features/auth/authSlice"; // Import SET_LOGIN action
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import "@fontsource/rubik"; // Import Rubik font
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import reddy from "../../assets/reddy.jpeg";

function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Access navigate function

  const postData = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_RENDER_URL}/api/users/login`,
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        // Redirect to home page after successful login
        dispatch(SET_LOGIN(true));
        dispatch(SET_NAME(response.data.name));
        dispatch(SET_ROLE(response.data.role));
        dispatch(
          SET_USER({ name: response.data.name, email: response.data.email })
        );
        // window.location.href = "/";
        navigate("/"); // Redirect using navigate function
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized - Incorrect email or password
        alert("Incorrect email or password. Please try again.");
      } else {
        // Other errors
        console.error(error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  // Function to handle email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{
        backgroundImage: `url(${reddy})`,   fontFamily: "Rubik, sans-serif" 
      }}
      // style={{ backgroundColor: "#04008b", fontFamily: "Rubik, sans-serif" }}
    >
      <Box
        className="max-w-6xl w-full flex rounded-xl bg-white m-6 "
        sx={{
          boxShadow: 24, // Adjust the elevation value as needed
          display: "flex",
        }}
      >
        {/* Left Half: Login Form */}
        <div className="w-full sm:w-1/2 p-8 my-auto py-10  sm:py-14 md:py-20 lg:py-28">
          <Link to="/">
            <ArrowBackIcon
              className="absolute top-6 left-6 text-white"
              style={{ fontSize: 32 }}
            />
          </Link>
          <div className="bg-white p-1 sm:p-6 md:p-8">
            <div className="text-center">
              <h2 className="mt-6 text-2xl md:text-3xl font-extrabold text-gray-900 text-left">
                Login
              </h2>
              <p className="text-left mt-2 text-sm sm:text-base">
                Enter your account details
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={postData}>
              <div>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  variant="outlined"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  
                />
              </div>

              <div>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Half: Image */}
        <div className="w-2/3 relative">
          <img
            className="w-full h-full object-cover rounded-r-xl "
            src={reddy}
            alt="Background"
          />
          <div
            className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold font-serif pl-10"
            style={{ fontFamily: "Rubik, sans-serif" }}
          >
            <div className="pl-10">
              <div className="text-3xl md:text-4xl lg:text-5xl">Welcome to</div>
              <div className="text-3xl md:text-3xl lg:text-4xl">
                Aspiring Abroad
              </div>
              <p className="text-xs md:text-xs lg:text-sm font-light mt-3">
                Login to access your account
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Login;
