import { useLocation, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectName } from "../redux/features/auth/authSlice";
import logo from "../assets/logo.jpeg";
import SendIcon from "@mui/icons-material/Send";
import { Helmet } from "react-helmet";

export default function Chatting() {
  const location = useLocation();
  const { name, country, city, university, image } = location.state;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const username = useSelector(selectName);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      fetchMessages();
    }
  }, [isLoggedIn]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_RENDER_URL}/messages/${username}/${name}`
      );
      setMessages(response.data.reverse());
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior (e.g., form submission)
      handleMessageSubmit();
    }
  };

  const handleMessageSubmit = async () => {
    if (!newMessage.trim()) {
      // If the new message is empty or contains only whitespace, do not proceed
      return;
    }
    try {
      // Include sender information along with the text
      await axios.post(`${process.env.REACT_APP_RENDER_URL}/messages`, {
        text: newMessage,
        sender: username,
        receiver: name,
        profile: image,
        status: false,
        role: "admin",
      });
      setNewMessage("");
      fetchMessages();
      await axios.post(`${process.env.REACT_APP_RENDER_URL}/notification`, {
        sender: name,
        receiver: username,
        text: newMessage,
        profile: image,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to format message time without seconds
  const formatMessageTime = (timestamp) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(timestamp).toLocaleTimeString([], options);
  };

  return isLoggedIn ? (
    <div className="flex flex-col h-screen relative">
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

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header with receiver name */}
        <div className="bg-gray-300 p-3 flex items-center sticky top-0 z-10">
          {/* Back icon */}
          <Link to="/community">
            <ArrowBackIcon className="text-gray-600 mr-3" />
          </Link>

          <img
            src={`images/${image}.jpeg`}
            alt="Receiver Profile"
            className="w-14 h-14 rounded-full mr-3"
          />
          <div>
            <div className="font-bold text-sm">{name}</div>
            <div className="text-gray-600">{university}</div>
            <div className="text-gray-600">{city + ", " + country}</div>
          </div>
        </div>

        {/* Chat messages */}
        <div
          className="flex-1 overflow-y-auto bg-gray-100 p-4 flex flex-col-reverse"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/geometric-background-vector-white-cube-patterns_53876-126683.jpg?w=2000&t=st=1713186598~exp=1713187198~hmac=f34267644ab66b9c71f7866e9f4e0195230ed8086e9eab72ee013e1ad0cbe1d7')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {messages.map((message, index) => (
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
      </div>

      {/* Chat input at bottom */}
      <div className="bg-gray-200 p-4 flex sticky bottom-0 z-10">
        <input
          type="text"
          className="w-full py-2 px-3 border rounded-md focus:outline-none focus:border-blue-400"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={handleMessageSubmit}
        >
          <SendIcon />
        </button>
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
}
