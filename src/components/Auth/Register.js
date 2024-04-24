import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
} from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import registerImage from "../../assets/register.jpeg";

export default function Register() {
  // State variables
  const [name, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to extract query parameters from URL
    const getQueryParams = (url) => {
      const params = {};
      const parser = document.createElement("a");
      parser.href = url;
      const query = parser.search.substring(1);
      const vars = query.split("&");
      for (const param of vars) {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
      }
      return params;
    };

    // Extract user data from URL query parameters
    const queryParams = getQueryParams(window.location.href);
    if (queryParams.userdata) {
      const userData = JSON.parse(queryParams.userdata);
      setFullname(userData.fullname);
      setEmail(userData.email);
    }
  }, []);

  const postData = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_RENDER_URL}/api/users/register`,
        {
          name: name,
          fullname: fullname,
          email: email,
          password: password,
          phonenumber: phonenumber,
          pincode: pincode,
        }
      );

      // Log in the user after successful registration
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_RENDER_URL}/api/users/login`,
        {
          email: email,
          password: password,
        }
      );

      if (loginResponse.status === 200) {
        dispatch(SET_LOGIN(true));
        dispatch(SET_NAME(loginResponse.data.name));
        dispatch(
          SET_USER({
            name: loginResponse.data.name,
            email: loginResponse.data.email,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${registerImage})`,
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

      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-md shadow-md">
        {window.location.href.startsWith(
          `${process.env.REACT_APP_RENDER_URL}/register?userdata`
        ) ? (
          <h2 className="text-3xl font-semibold text-center mb-4">
            Complete Profile
          </h2>
        ) : (
          <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>
        )}
        <form onSubmit={postData}>
          <div className="space-y-2">
            {/* Username */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Username<span className="text-red-600">*</span>
              </label>
              <TextField
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className=" block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Fullname */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name<span className="text-red-600">*</span>
              </label>
              <TextField
                id="name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address<span className="text-red-600">*</span>
              </label>
              <TextField
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <TextField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full"
                  size="small"
                  variant="standard" 
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number<span className="text-red-600">*</span>
              </label>
              <TextField
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Pin Code */}
            <div>
              <label
                htmlFor="pinCode"
                className="block text-sm font-medium text-gray-700"
              >
                Pin Code <span className="text-red-600">*</span>
              </label>
              <TextField
                id="pinCode"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-600">{error}</div>}
          </div>
          {/* Submit Buttons */}
          <div className="pt-5">
            <div className="flex justify-end">
              <Link to="/"
                type="button"
                className="mr-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                {window.location.href.startsWith(
                  `${process.env.REACT_APP_RENDER_URL}/register?userdata`
                )
                  ? "Finish"
                  : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
