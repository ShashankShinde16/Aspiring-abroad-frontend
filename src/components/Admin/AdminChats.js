import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/features/auth/authSlice";
import CommButton from "../Home/commButton";

function AdminChats() {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const role = useSelector(selectRole);

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    // Filter collections when search term changes
    const filtered = collections.filter((collection) =>
      collection.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCollections(filtered);
  }, [collections, searchTerm]);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_RENDER_URL}/user-collections`
      ); // Update the URL
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const handleCollectionClick = async (user) => {
    try {
      // Fetch receiver data from the backend
      const response = await axios.get(
        `${process.env.REACT_APP_RENDER_URL}/receivers/${user.name}`
      );

      // Check if receiver data exists
      if (response.data.length > 0) {
        // Redirect to /admin/:user upon collection click
        navigate(`/admin/${user.name}`);
      } else {
        // Show alert if no receiver found
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error fetching receiver data:", error);
      // Handle error, such as displaying an error message to the user
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (role !== "admin") {
    return <Navigate to="/" />; // Assuming you have a login page, change this accordingly
  }

  return (
    <>
      {/* Alert */}
      {showAlert && (
        <div className="fixed top-0 right-0 z-50 p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-12 py-4 my-auto rounded relative" role="alert">
            <strong className="font-bold">This user has not communicated yet with any volunteer!</strong>
            <button className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={handleCloseAlert}>
              <svg className="fill-current h-6 w-6 text-red-500 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1 1 0 0 1-1.414 1.415l-2.829-2.828-2.828 2.828a1 1 0 1 1-1.414-1.415l2.828-2.828-2.828-2.829a1 1 0 0 1 1.414-1.414l2.828 2.828 2.829-2.828a1 1 0 0 1 1.414 1.414l-2.828 2.829 2.828 2.828z"/></svg>
            </button>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className={`w-full bg-gray-200 border-r border-gray-300 p-4`}>
          <h2 className="font-bold text-lg mb-4">Collections</h2>
          <div className="relative">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
          {/* Scrollable list */}
          <div className="overflow-y-auto max-h-[calc(100vh-6rem)]">
            <ul>
              {filteredCollections.map((collection, index) => (
                <li
                  key={index}
                  className="flex py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCollectionClick(collection)}
                >
                  <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      class="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h1 className="align-self-center ml-2 font-semibold">
                    {collection.name +" ("+ collection.fullname  +") "}
                  </h1>
                </li>
              ))}
            </ul>
            <CommButton/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminChats;
