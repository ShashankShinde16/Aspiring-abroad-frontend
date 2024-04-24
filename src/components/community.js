import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../Volunteers.json";
import { useCountry } from "./CountryContext";
import { Helmet } from "react-helmet";

function Volunteer() {
  const { selectedCountry } = useCountry();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    country: selectedCountry,
    city: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilters((prevFilters) => ({ ...prevFilters, country: selectedCountry }));
  }, [selectedCountry]);

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        item.Countries.toLowerCase().includes(filters.country.toLowerCase()) &&
        item.Cities.toLowerCase().includes(filters.city.toLowerCase()) &&
        (item.First_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filteredData);
  }, [filters, searchTerm]);

  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8">
      <Helmet>
        <title>Community - Aspiring Abroad</title>
        <meta
          name="description"
          content="Explore a community of volunteers from various countries and cities who are willing to assist and support international students in their education journey. Connect with volunteers, chat with them, and gain valuable insights and advice on studying abroad."
        />
        <meta
          name="keywords"
          content="volunteer community, international student support, study abroad assistance, education volunteers, community engagement, student mentorship, study abroad advice, education support, cross-cultural exchange, student networking"
        />
        {/* Add other meta tags as needed */}
      </Helmet>

      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">User Accounts</h2>
          <span className="text-xs text-gray-500">
            View accounts of registered users
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start sm:gap-4 pb-4">
        <div className="w-56 lg:w-56 sm:w-auto mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              id="search_input"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer cursor-text"
              value={searchTerm}
              placeholder=" "
              onChange={handleSearchChange}
            />
            <label
              htmlFor="search_input"
              className="cursor-text absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Search Name
            </label>
          </div>
        </div>
        <div className="w-56 lg:w-56 sm:w-auto mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              id="country_input"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer cursor-text"
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              placeholder=" "
            />
            <label
              htmlFor="country_input"
              className="cursor-text absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Filter by Country
            </label>
          </div>
        </div>
        <div className="w-56 lg:w-56 sm:w-auto mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              id="city_input"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer cursor-text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder=" "
            />
            <label
              htmlFor="city_input"
              className="cursor-text absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Filter by City
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className="bg-red-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">Profile</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Country</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-dark">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <Link
                      to="/chatting"
                      state={{
                        name: item.First_Name + " " + item.Last_name,
                        country: item.Countries,
                        city: item.Cities,
                        image: item.Image_file,
                      }}
                      className=" text-red-700 flex justify-end px-2 pb-4"
                    >
                      <img
                        src={`images/${item.Image_file}.jpeg`}
                        alt=""
                        className=" w-14 h-14 rounded-full"
                      />
                    </Link>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="whitespace-no-wrap text-gray-700">
                          {item.First_Name + " " + item.Last_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-700">
                      {item.Countries}
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-700">
                      {item.Cities}
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <Link
                      to="/chatting"
                      state={{
                        name: item.First_Name + " " + item.Last_name,
                        country: item.Countries,
                        city: item.Cities,
                        image: item.Image_file,
                      }}
                      className=" text-red-700 flex justify-end px-2 pb-4"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-primary text-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                      >
                        Chat
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            {" "}
            Showing {indexOfFirstItem + 1} to{" "}
            {indexOfLastItem > filteredData.length
              ? filteredData.length
              : indexOfLastItem}{" "}
            of {filteredData.length} Entries{" "}
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button
              onClick={handlePrevPage}
              className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volunteer;
