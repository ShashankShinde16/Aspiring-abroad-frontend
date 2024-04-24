import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-6">
          <span className="glitch">404</span>
        </h1>
        <p className="text-xl mb-6">Oops! It looks like you're lost.</p>
        <div className="mb-6">
          <p className="text-lg mb-2">Here are some helpful links:</p>
          <ul className="list-none">
            <li className="mb-2">
              <Link
                to="/"
                className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/scholarships"
                className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
              >
                Scholarships
              </Link>
            </li>
             <li className="mb-2">
              <Link
                to="/blogs"
                className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-lg">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
