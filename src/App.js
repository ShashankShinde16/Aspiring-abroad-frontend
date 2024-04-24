import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Community from "./components/community";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/HomePage";
import Chatting from "./components/chatting";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import Navlist from "./components/Home/Navlist";
import Chats from "./components/Chats";
import Admin from "./components/Admin/Admin";
import Scholarship from "./components/Scholarship/Scholarship";
import AdminChats from "./components/Admin/AdminChats";
import Profile from "./components/Auth/Profile";
import ScholarshipPost from "./components/Scholarship/NewScholarship";
import UsersChats from "./components/Admin/UsersChats";
import IndexPage from "./components/Blogs/IndexPage";
import CreatePost from "./components/Blogs/CreatePost";
import ScholarshipPage from "./components/Scholarship/ScholarshipPage";
import EditScholarship from "./components/Scholarship/EditScholarship";
import PostPage from "./components/Blogs/PostPage";
import EditPost from "./components/Blogs/EditPost";
import SignupPage from "./components/Auth/SignupPage";
import RegisterVolunteer from "./components/Auth/RegisterVolunteer";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Dispatch login status from localStorage on component mount
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    dispatch(SET_LOGIN(isLoggedIn));
  }, [dispatch]);

  const handleLogout = () => {
    // Handle logout logic here
    dispatch(SET_LOGIN(false)); // Assuming this updates the login status in Redux
    // Additional actions can be added here, such as clearing local storage, etc.
  };

  // Check if the current route matches "/admin/:user"
  const isAdminRoute = location.pathname.startsWith("/admin/");
  const isChatRoute = location.pathname === "/chats";
  const isChattingRoute = location.pathname === "/chatting";
  const isLoginRoute = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";
  const isRegister = location.pathname === "/register";
  const isRegistervolunteer = location.pathname === "/registervolunteer";

  return (
    <>
      {!isAdminRoute &&
        !isChatRoute &&
        !isChattingRoute &&
        !isLoginRoute &&
        !isSignup &&
        !isRegister &&
        !isRegistervolunteer && <Navlist handleLogout={handleLogout} />}
      <Routes>
        <Route exact path="/notfoundpage" element={<NotFoundPage />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/profile" element={<Profile />} />
        <Route exact path="/scholarships" element={<Scholarship />} />{" "}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-chats" element={<AdminChats />} />
        <Route path="/admin-scholarship" element={<ScholarshipPost />} />
        <Route path="/admin/:user" element={<UsersChats />} />
        <Route path="/scholarships/:id" element={<ScholarshipPage />} />
        <Route path="/edit/scholarships/:id" element={<EditScholarship />} />
        <Route path="/blogs" element={<IndexPage />} />
        <Route path="/admin-blogs" element={<CreatePost />} />
        <Route path="/blog/:id" element={<PostPage />} />
        <Route path="/edit-blog/:id" element={<EditPost />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/registervolunteer" element={<RegisterVolunteer />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
