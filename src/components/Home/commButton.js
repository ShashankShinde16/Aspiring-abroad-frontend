import React from "react";
import { Link } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';

export default function commButton({ to }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link to={"/community"}>
        <button
          className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md"
          style={{ width: "50px", height: "50px" }}
        >
          <PeopleIcon />
        </button>
      </Link>
    </div>
  );
}
