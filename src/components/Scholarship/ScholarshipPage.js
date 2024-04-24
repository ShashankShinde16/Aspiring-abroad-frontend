import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ScholarshipPage() {
  const { id } = useParams();
  const [scholarshipData, setScholarshipData] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_RENDER_URL}/scholarships/${id}`);
        setScholarshipData(response.data);
      } catch (error) {
        console.error('Error fetching scholarship:', error);
      }
    };

    fetchScholarship();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      
      {scholarshipData ? (
        <>
          <h1 className="text-3xl font-semibold mb-4">{scholarshipData.name}</h1>
          <div className="max-w-full mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img
                src={scholarshipData.photo}
                alt={scholarshipData.name}
                className="w-full h-64 object-contain "
              />
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Funding</h2>
                <p>{scholarshipData.funding}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Eligibility</h2>
                <p>{scholarshipData.eligibility}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Process</h2>
                <p>{scholarshipData.process}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Dates</h2>
                <p>{scholarshipData.dates}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                <p>{scholarshipData.requirements}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
                <p>{scholarshipData.additional}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ScholarshipPage;
