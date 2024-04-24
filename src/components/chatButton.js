import React from "react";
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function chatButton({ onClick }) {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={onClick}
        className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md"
        style={{ width: "50px", height: "50px" }}
      >
        <FeedbackIcon />
      </button>
    </div>
  );
}
