import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectName, selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../assets/logo.jpeg";
import SendIcon from "@mui/icons-material/Send";
import { Helmet } from "react-helmet";
import CommButton from "./Home/commButton";

const Chats = () => {
  const [receivers, setReceivers] = useState([]);
  const [filteredReceivers, setFilteredReceivers] = useState([]); // Filtered list based on search
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const username = useSelector(selectName);
  const chatContainerRef = useRef(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
        `${process.env.REACT_APP_RENDER_URL}/receivers/${username}`
      );
      setReceivers(response.data);
    } catch (error) {
      console.error("Error fetching receivers:", error);
    }
  };

  const fetchChatMessages = async (receiver) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_RENDER_URL}/messages/${username}/${receiver}`
      );
      setChatMessages(response.data.reverse());
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const handleReceiverClick = async (receiver) => {
    const response = await axios.get(
      `${process.env.REACT_APP_RENDER_URL}/${receiver.receiver}/${username}`
    );
    setSelectedReceiver(response.data[0]);
    fetchChatMessages(receiver.receiver);
    setSidebarVisible(false); // Hide sidebar on receiver click
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      // If the new message is empty or contains only whitespace, do not proceed
      return;
    }
    const data = selectedReceiver.First_Name + " " + selectedReceiver.Last_name;
    try {
      await axios.post(`${process.env.REACT_APP_RENDER_URL}/messages`, {
        text: newMessage,
        sender: username,
        receiver: data,
        profile: selectedReceiver.Image_file,
        status: false,
        role: "admin",
      });
      setNewMessage("");
      fetchChatMessages(data);

      await axios.post(`${process.env.REACT_APP_RENDER_URL}/notification`, {
        sender: username,
        receiver: data,
        text: newMessage,
        profile: selectedReceiver.Image_file,
        role: "admin",
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
  }, [chatMessages]);

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

  return isLoggedIn ? (
    <div className="flex h-screen">
      <Helmet>
        <title>Chats - Aspiring Abroad</title>
        <meta
          name="description"
          content="Explore and engage in chats with other users on Aspiring Abroad. Connect with fellow students, share insights, and seek advice on studying abroad."
        />
        <meta
          name="keywords"
          content="chats, messaging, conversations, student community, study abroad, international students, chat application, peer support, student advice, communication platform"
        />
        {/* Add other meta tags as needed */}
      </Helmet>

      {/* Sidebar with receiver list */}
      <div
        className={`w-full h-full bg-gray-200 border-r border-gray-300 p-4 ${
          sidebarVisible ? "" : "hidden"
        }`}
      >
        <div className="flex items-center mb-4">
          <Link to="/" className="text-gray-600">
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
        </div>
        <ul className="overflow-y-auto">
          {filteredReceivers.map((data, index) => (
            <li
              key={index}
              className="flex items-center py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleReceiverClick(data)}
            >
              <img
                src={`images/${data.profile}.jpeg`}
                alt=""
                className="w-12 h-12 bg-gray-300 rounded-full mr-3"
              />
              <div>
                <div className="font-bold">{data.receiver}</div>
                <div className="text-gray-600">
                  {data.lastText.length > 12
                    ? `${data.lastText.slice(0, 12)}...`
                    : data.lastText}{" "}
                  - {data.lastTime && formatDateOrTime(new Date(data.lastTime))}
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
        <CommButton />
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
                {selectedReceiver.First_Name + " " + selectedReceiver.Last_name}
              </div>
              <div className="flex italic text-sm">
                {selectedReceiver.University_Name +
                  ", " +
                  selectedReceiver.Cities}
                ,
                <p className="  text-red-500 pl-1">
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
            className="flex-1 overflow-y-auto p-4 flex flex-col-reverse"
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
                  message.sender === username ? "text-right" : "text-left"
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
    <div class="flex justify-center items-center h-screen bg-gradient-to-b from-red-400 to-red-500 text-gray-800 ">
      <Link to="/">
        <ArrowBackIcon
          className="absolute top-6 left-6 text-white"
          style={{ fontSize: 32 }}
        />
      </Link>
      <div class="bg-white p-8 rounded-xl shadow-2xl flex w-2/3 h-2/3 ">
        <div class="flex justify-center w-1/2">
          <img src={logo} alt="Login Image" class="rounded-l-xl " />
        </div>
        <div class="w-1/2 flex flex-col justify-center items-center">
          <h2 class="text-3xl font-semibold mb-6 text-center">Welcome Back!</h2>
          <p class="text-lg mb-8 text-center">Please log in to continue.</p>
          <a
            href="/login"
            class="inline-block px-6 py-3 bg-red-500 text-white rounded-md transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-100"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Chats;
