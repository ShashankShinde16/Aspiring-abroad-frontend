import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField } from "@mui/material";
import registerImage from "../../assets/register.jpeg";

export default function RegisterVolunteer() {
  // State variables
  const [Sr_No, setSr_No] = useState("");
  const [First_Name, setFirst_Name] = useState("");
  const [Last_name, setLast_name] = useState("");
  const [Gender, setGender] = useState("");
  const [Countries, setCountries] = useState("");
  const [Cities, setCities] = useState("");
  const [University_Name, setUniversity_Name] = useState("");
  const [Image_file, setImage_file] = useState("");
  const [error, setError] = useState("");

  const postData = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_RENDER_URL}/api/volunteers/registervolunteer`,
        {
          Sr_No: Sr_No,
          First_Name: First_Name,
          Last_name: Last_name,
          Gender: Gender,
          Countries: Countries,
          Cities: Cities,
          University_Name: University_Name,
          Image_file: Image_file,
        }
      );
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
      <div className="max-w-sm w-full mx-auto p-6 bg-white rounded-md shadow-md overflow-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Register as a volunteer
        </h2>
        <form onSubmit={postData}>
          <div className="space-y-2">
            {/* SR_NO */}
            <div>
              <label
                htmlFor="Sr_No"
                className="block text-xs font-medium text-gray-700"
              >
                Serial Number<span className="text-red-600">*</span>
              </label>
              <TextField
                id="Sr_No"
                value={Sr_No}
                onChange={(e) => setSr_No(e.target.value)}
                required
                className="block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* First Name */}
            <div>
              <label
                htmlFor="first_name"
                className="block text-xs font-medium text-gray-700"
              >
                First Name<span className="text-red-600">*</span>
              </label>
              <TextField
                id="first_name"
                value={First_Name}
                onChange={(e) => setFirst_Name(e.target.value)}
                required
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="last_name"
                className="block text-xs font-medium text-gray-700"
              >
                Last Name<span className="text-red-600">*</span>
              </label>
              <TextField
                id="last_name"
                value={Last_name}
                onChange={(e) => setLast_name(e.target.value)}
                required
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-xs font-medium text-gray-700"
              >
                Gender<span className="text-red-600">*</span>
              </label>
              <TextField
                id="gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Countries */}
            <div>
              <label
                htmlFor="countries"
                className="block text-xs font-medium text-gray-700"
              >
                Countries<span className="text-red-600">*</span>
              </label>
              <TextField
                id="countries"
                value={Countries}
                onChange={(e) => setCountries(e.target.value)}
                required
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Cities */}
            <div>
              <label
                htmlFor="cities"
                className="block text-xs font-medium text-gray-700"
              >
                Cities<span className="text-red-600">*</span>
              </label>
              <TextField
                id="cities"
                value={Cities}
                onChange={(e) => setCities(e.target.value)}
                required
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* University Name */}
            <div>
              <label
                htmlFor="university_name"
                className="block text-xs font-medium text-gray-700"
              >
                University Name<span className="text-red-600">*</span>
              </label>
              <TextField
                id="university_name"
                value={University_Name}
                onChange={(e) => setUniversity_Name(e.target.value)}
                required
                className="mt-1 block w-full"
                size="small"
                variant="standard" 
              />
            </div>

            {/* Image File */}
            <div>
              <label
                htmlFor="image_file"
                className="block text-xs font-medium text-gray-700"
              >
                Image File<span className="text-red-600">*</span>
              </label>
              <input
                id="image_file"
                type="file"
                value={Image_file}
                onChange={(e) => setImage_file(e.target.value)}
                required
                className="mt-1 text-xs block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                variant="standard" 
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-600">{error}</div>}
          </div>
          {/* Submit Buttons */}
          <div className="pt-5">
            <div className="flex justify-end">
              <Link
                to="/"
                className="mr-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
