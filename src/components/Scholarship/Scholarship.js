import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NotFoundPage from "../NotFoundPage";

const Scholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [error, setError] = useState(false); // State to track error
  const role = useSelector(selectRole);


  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_RENDER_URL}/scholarships`
        );
        console.log(response.data);
        setScholarships(response.data);
        setError(false); // Reset error state if data is fetched successfully
      } catch (error) {
        console.error("Error fetching scholarships:", error);
        setError(true); // Set error state to true
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Scholarships - Aspiring Abroad</title>
        <meta
          name="description"
          content="Explore a variety of scholarships offered by Aspiring Abroad to support your international education journey. Find funding opportunities for students pursuing higher education abroad."
        />
        <meta
          name="keywords"
          content="study abroad scholarships, international education funding, student scholarships, overseas education grants, higher education funding, financial aid for studying abroad, scholarship opportunities, education grants, academic scholarships, merit-based scholarships, need-based scholarships, undergraduate scholarships, graduate scholarships, scholarship programs, study abroad financial support"
        />
        {/* Add other meta tags as needed */}
      </Helmet>

      {error ? ( // Render 404 page if error occurred
        <NotFoundPage />
      ) : (
        <div className="container mx-auto mt-4 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 p-3 text-white rounded-b-3xl shadow-lg bg-red-500 mx-auto max-w-md">
            Scholarships
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg relative transition duration-500 ease-in-out transform hover:scale-105"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center justify-center h-48">
                  <img
                    src={scholarship.photo}
                    alt={scholarship.name}
                    className="object-cover h-full w-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="bg-gray-100 rounded-b-lg">
                  <div className=" p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {scholarship.name}
                        </h2>
                        <p className="text-gray-600">
                          Funding: {scholarship.funding}
                        </p>
                      </div>
                      <div className="flex flex-col text-center gap-1">
                        {role === "admin" && (
                          <Link
                            to={`/edit/scholarships/${scholarship.id}`}
                            className="inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                          >
                            Edit
                          </Link>
                        )}
                        <Link
                          to={`/scholarships/${scholarship.id}`}
                          className="inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Scholarship;
