import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectRole,
} from "../../redux/features/auth/authSlice";
import { Link, useParams, Navigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";

const UsersChats = () => {
  const [receivers, setReceivers] = useState([]);
  const [filteredReceivers, setFilteredReceivers] = useState([]); // Filtered list based on search
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useParams();
  const chatContainerRef = useRef(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectRole);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    fetchReceivers();
  }, [chatMessages]);

  useEffect(() => {
    setFilteredReceivers(
      receivers.filter((receiver) =>
        receiver.receiver.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, receivers]);

  const fetchReceivers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_RENDER_URL}/admin/receivers/${user}`
      );
      console.log(response.data);
      setReceivers(response.data);
    } catch (error) {
      console.error("Error fetching receivers:", error);
    }
  };

  const fetchChatMessages = async (receiver) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_RENDER_URL}/messages/${user}/${receiver}`
      );
      setChatMessages(response.data.reverse());
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const handleReceiverClick = async (receiver) => {
    const response = await axios.get(
      `${process.env.REACT_APP_RENDER_URL}/admin/${receiver.receiver}/${user}`
    );
    setSelectedReceiver(response.data[0]);
    fetchChatMessages(receiver.receiver);
    setSidebarVisible(false); // Hide sidebar on receiver click
  };

  const handleSendMessage = async () => {
    try {
      if (!newMessage.trim()) {
        // If the message is empty, return early
        return;
      }
      const data =
        selectedReceiver.First_Name + " " + selectedReceiver.Last_name;
      await axios.post(`${process.env.REACT_APP_RENDER_URL}/messages/admin`, {
        text: newMessage,
        sender: data,
        receiver: user,
        profile: selectedReceiver.Image_file,
        status: false,
        role: "user",
      });
      setNewMessage("");
      fetchChatMessages(data);

      await axios.post(`${process.env.REACT_APP_RENDER_URL}/notification`, {
        sender: data,
        receiver: user,
        text: newMessage,
        profile: selectedReceiver.Image_file,
        role: "user",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, selectedReceiver]);

  // Function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Function to format date or time
  const formatDateOrTime = (date) => {
    if (isToday(date)) {
      const options = { hour: "numeric", minute: "numeric" };
      return date.toLocaleTimeString([], options);
    } else {
      return date.toLocaleDateString();
    }
  };

  // Function to format message time without seconds
  const formatMessageTime = (timestamp) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(timestamp).toLocaleTimeString([], options);
  };

  const handleBackButtonClick = () => {
    setSidebarVisible(true); // Show sidebar when back button is clicked
    setSelectedReceiver(null); // Clear selected receiver
  };

  if (role !== "admin") {
    return <Navigate to="/" />; // Assuming you have a login page, change this accordingly
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Main content */}
      {isLoggedIn ? (
        <div className="flex-1 flex flex-col">
          {/* Sidebar with receiver list */}
          <div
            className={`flex-none w-full h-full bg-gray-200 border-r border-gray-300 p-4 ${
              sidebarVisible ? "" : "hidden"
            }`}
          >
            <div className="flex items-center mb-4">
              <Link to="/admin-chats" className="text-gray-600">
                <ArrowBackIcon></ArrowBackIcon>
              </Link>
              <div className="font-bold text-lg ml-4">Chats</div>
            </div>
            <div className="relative">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 100 10 5 5 0 000-10zM0 10a10 10 0 1120 0 10 10 0 01-20 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 100 10 5 5 0 000-10zM0 10a10 10 0 1120 0 10 10 0 01-20 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 1a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 100 10 5 5 0 000-10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <ul className="overflow-y-auto">
              {filteredReceivers.map((data, index) => (
                <li
                  key={index}
                  className="flex items-center py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleReceiverClick(data)}
                >
                  <img
                    src={require(`/public/images/${data.profile}.jpeg`)}
                    alt=""
                    className="w-12 h-12 bg-gray-300 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-bold">{data.receiver}</div>
                    <div className="text-gray-600">
                      {data.lastText.length > 12
                        ? `${data.lastText.slice(0, 12)}...`
                        : data.lastText}{" "}
                      -{" "}
                      {data.lastTime &&
                        formatDateOrTime(new Date(data.lastTime))}
                    </div>
                  </div>
                  {data.unreadCount > 0 && (
                    <div className=" w-6 h-6 rounded-full bg-green-600 text-center">
                      {data.unreadCount}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Main chat area */}
          <div className="flex-1 flex flex-col">
            {/* Header with receiver name */}
            {selectedReceiver && (
              <div className="sticky top-0 z-10 bg-gray-300 p-3 flex items-center">
                <button
                  onClick={handleBackButtonClick}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <ArrowBackIcon />
                </button>
                <img
                  src={require(`/public/images/${selectedReceiver.Image_file}.jpeg`)}
                  alt=""
                  className="w-10 h-10  bg-gray-300 rounded-full mr-3"
                />
                <div>
                  <div className="font-bold text-lg">
                    {selectedReceiver.First_Name +
                      " " +
                      selectedReceiver.Last_name}
                  </div>
                  <div className="flex italic text-sm">
                    {selectedReceiver.University_Name +
                      ", " +
                      selectedReceiver.Cities +
                      ","}
                    <p className="  text-red-500 px-1">
                      {selectedReceiver.Countries}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chat messages */}
            {selectedReceiver && (
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto bg-gray-100 p-4 flex flex-col-reverse"
                style={{
                  backgroundImage:
                    "url('https://img.freepik.com/free-vector/geometric-background-vector-white-cube-patterns_53876-126683.jpg?w=2000&t=st=1713186598~exp=1713187198~hmac=f34267644ab66b9c71f7866e9f4e0195230ed8086e9eab72ee013e1ad0cbe1d7')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      message.sender === user ? "text-left" : "text-right"
                    }`}
                  >
                    <div className="inline-block max-w-2/3 bg-white rounded-lg p-2 shadow-md">
                      <div className="text-lg">{message.text}</div>
                      <div className="text-xs text-gray-500">
                        {formatMessageTime(message.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chat input */}
            {selectedReceiver && (
              <div className="sticky bottom-0 z-10 bg-gray-200 p-4 flex">
                <input
                  type="text"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:border-blue-400"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  className="ml-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={handleSendMessage}
                >
                  <SendIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h2 className="text-2xl font-semibold mb-4">
            You are not logged in!
          </h2>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-center"
          >
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default UsersChats;
