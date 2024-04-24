import React, { useState, useEffect } from "react";
import axios from "axios";
import { selectName } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

function Profile() {
  const user = useSelector(selectName);

  const [userData, setUserData] = useState({
    _id: "",
    fullname: "",
    name: "",
    email: "",
    phonenumber: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_RENDER_URL}/api/${user}`
        );
        const { name, fullname, email, phonenumber, pincode } = response.data; // Destructure only the required fields
        setUserData({ name, fullname, email, phonenumber, pincode });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>User Profile - Aspiring Abroad</title>
        <meta
          name="description"
          content="View and manage your user profile details on Aspiring Abroad. Access your username, full name, email, phone number, and pincode information."
        />
        <meta
          name="keywords"
          content="user profile, account details, personal information, username, full name, email, phone number, pincode, user management"
        />
        {/* Add other meta tags as needed */}
      </Helmet>

      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            readOnly
            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="p-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Fullname
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.fullname}
            readOnly
            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="p-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            readOnly
            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="p-4">
          <label
            htmlFor="phonenumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={userData.phonenumber}
            readOnly
            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="p-4">
          <label
            htmlFor="pincode"
            className="block text-gray-700 font-bold mb-2"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={userData.pincode}
            readOnly
            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
