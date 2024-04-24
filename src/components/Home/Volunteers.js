import React from "react";
import { Link } from "react-router-dom";
import data from "../../Volunteers.json";

const volunteersData = [
  {
    id: 1,
    fullname: data[0].First_Name + " " + data[0].Last_name,
    country: data[0].Countries,
    city: data[0].Cities,
    university: data[0].University_Name,
    image: data[0].Image_file,
  },
  {
    id: 2,
    fullname: data[1].First_Name + " " + data[1].Last_name,
    country: data[1].Countries,
    city: data[1].Cities,
    university: data[1].University_Name,
    image: data[1].Image_file,
  },
  {
    id: 3,
    fullname: data[2].First_Name + " " + data[2].Last_name,
    country: data[2].Countries,
    city: data[2].Cities,
    university: data[2].University_Name,
    image: data[2].Image_file,
  },
  {
    id: 4,
    fullname: data[3].First_Name + " " + data[3].Last_name,
    country: data[3].Countries,
    city: data[3].Cities,
    university: data[3].University_Name,
    image: data[3].Image_file,
  },
  {
    id: 5,
    fullname: data[4].First_Name + " " + data[4].Last_name,
    country: data[4].Countries,
    city: data[4].Cities,
    university: data[4].University_Name,
    image: data[4].Image_file,
  },
  {
    id: 6,
    fullname: data[5].First_Name + " " + data[5].Last_name,
    country: data[5].Countries,
    city: data[5].Cities,
    university: data[5].University_Name,
    image: data[5].Image_file,
  },
  {
    id: 7,
    fullname: data[6].First_Name + " " + data[6].Last_name,
    country: data[6].Countries,
    city: data[6].Cities,
    university: data[6].University_Name,
    image: data[6].Image_file,
  },
];

function Volunteer() {
  return (
    <div className="flex justify-center flex-shrink-0 flex-wrap volunteer ">
      {volunteersData.map((volunteer, index) => (
        <React.Fragment key={volunteer.id}>
          {(index === 0 || index === 3 || index === 6) && (
            <div
              className={`grid grid-cols-1 content-center p-4 bg-white rounded-lg shadow-md w-64 mx-4 mb-4 hover:shadow-2xl`}
            >
              <img
                src={"images/" + volunteer.image + ".jpeg"}
                alt={volunteer.fullname}
                className="rounded-full w-32 h-32 mx-auto mb-2"
              />
              <p className="text-center">{volunteer.fullname}</p>
              <p className="text-center text-gray-500 mb-2 text-xs">
                {volunteer.university}
              </p>
              <p className="text-center text-gray-500 mb-2 text-xs">
                {volunteer.city + ", " + volunteer.country}
              </p>
              <Link
                to="/chatting"
                state={{
                  name: volunteer.fullname,
                  country: volunteer.country,
                  city: volunteer.city,
                  university: volunteer.university,
                  image: volunteer.image,
                }}
                className=" text-red-700 flex justify-center"
              >
                <button
                  type="button"
                  className="btn btn-outline-primary text-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                >
                  Chat
                </button>
              </Link>
            </div>
          )}
          {(index === 1 || index === 4) && (
            <div key={volunteer.id} className="flex flex-col px-4 pb-4">
              <div className="p-4 bg-white rounded-lg shadow-md w-64 mb-4 hover:shadow-2xl text-sm">
                <img
                  src={"images/" + volunteersData[index].image + ".jpeg"}
                  alt={volunteersData[index].fullname}
                  className="rounded-full w-16 h-16 mx-auto mb-2"
                />
                <p className="text-center text-sm">
                  {volunteersData[index].fullname}
                </p>
                <p className="text-center text-gray-500 mb-2 text-xs">
                  {volunteersData[index].university}
                </p>
                <p className="text-center text-gray-500 mb-2 text-xs">
                  {volunteersData[index].city +
                    ", " +
                    volunteersData[index].country}
                </p>
                <Link
                  to="/chatting"
                  state={{
                    name: volunteer.fullname,
                    country: volunteer.country,
                    city: volunteer.city,
                    university: volunteer.university,
                    image: volunteer.image,
                  }}
                  className=" text-red-700 flex justify-center"
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary text-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                  >
                    Chat
                  </button>
                </Link>
              </div>
              {index + 1 < volunteersData.length && (
                <div className="p-4 bg-white rounded-lg shadow-md w-64 hover:shadow-2xl">
                  <img
                    src={"images/" + volunteersData[index + 1].image + ".jpeg"}
                    alt={volunteersData[index + 1].fullname}
                    className="rounded-full w-16 h-16 mx-auto mb-2"
                  />
                  <p className="text-center text-sm">
                    {volunteersData[index + 1].fullname}
                  </p>
                  <p className="text-center text-gray-500 mb-2 text-xs">
                    {volunteersData[index + 1].university}
                  </p>
                  <p className="text-center text-gray-500 mb-2 text-xs">
                    {volunteersData[index + 1].city +
                      ", " +
                      volunteersData[index + 1].country}
                  </p>
                  <Link
                    to="/chatting"
                    state={{
                      name: volunteersData[index + 1].fullname,
                      country: volunteersData[index + 1].country,
                      city: volunteersData[index + 1].city,
                      university: volunteersData[index + 1].university,
                      image: volunteersData[index + 1].image,
                    }}
                    className=" text-red-700 flex justify-center"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary text-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                    >
                      Chat
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Volunteers() {
  return (
    <div className="py-8 bg-gray-100 overflow-hidden ">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold pb-2 text-center">
        Most Consistent Volunteers
      </h2>
      <div className="flex justify-end">
        <Link
          to="/community"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mb-3 rounded-full shadow-md mr-4"
        >
          View More
        </Link>
      </div>

      <div className="flex" style={{ width: "2800px" }}>
        <Volunteer />
        <Volunteer />
      </div>
    </div>
  );
}

export default Volunteers;
