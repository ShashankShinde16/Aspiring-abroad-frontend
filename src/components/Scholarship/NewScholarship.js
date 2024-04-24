import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ScholarshipPost = () => {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: '',
    photo: null,
    funding: '',
    eligibility: '',
    process: '',
    dates: '',
    requirements: '',
    additional: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_RENDER_URL}/scholarship`, formData);
      setSuccessMessage('Scholarship submitted successfully!');
      // Clear form inputs after successful submission
      setFormData({
        id: uuidv4(),
        name: '',
        photo: null,
        funding: '',
        eligibility: '',
        process: '',
        dates: '',
        requirements: '',
        additional: ''
      });
      // Remove success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

    } catch (err) {
      console.error('Error creating scholarship:', err);
      // Handle error - display error message to user
    }
  };

  


  return (
    <div className="flex justify-center items-center bg-gray-100 py-4">
      <div className=" max-w-screen-lg w-full mx-auto p-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-4">Add New Scholarship</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name<span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            {/* Photo */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <input
                id="photo"
                type="file"
                name="photo"
                onChange={handleFileChange} // Add onChange event handler to handle file selection
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            {/* Funding */}
            <div>
              <label htmlFor="funding" className="block text-sm font-medium text-gray-700">
                Funding
              </label>
              <input
                id="funding"
                type="number"
                name="funding"
                value={formData.funding}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            {/* Eligibility */}
            <div>
              <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700">
                Eligibility
              </label>
              <textarea
                id="eligibility"
                type="text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            {/* Process */}
            <div>
              <label htmlFor="process" className="block text-sm font-medium text-gray-700">
                Process
              </label>
              <textarea
                id="process"
                type="text"
                name="process"
                value={formData.process}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            {/* Dates */}
            <div>
              <label htmlFor="dates" className="block text-sm font-medium text-gray-700">
                Dates
              </label>
              <input
                id="dates"
                type="date"
                name="dates"
                value={formData.dates}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Requirements
              </label>
              <textarea
                id="requirements"
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            {/* Additional */}
            <div>
              <label htmlFor="additional" className="block text-sm font-medium text-gray-700">
                Additional Information
              </label>
              <textarea
                id="additional"
                type="text"
                name="additional"
                value={formData.additional}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            {/* Error Message */}
            {/* {error && <div className="text-red-600">{error}</div>} */}

            {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

          </div>
          {/* Submit Buttons */}
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
};

export default ScholarshipPost;
