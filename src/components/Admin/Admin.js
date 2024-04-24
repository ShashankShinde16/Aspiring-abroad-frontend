import React from 'react';
import { Link, Navigate } from 'react-router-dom'; // Assuming you're using React Router
import { useSelector } from "react-redux";
import { selectRole} from "../../redux/features/auth/authSlice";

const Box = (props) => {
    return (
        <div className=" bg-slate-800 w-48 h-48 m-4 flex items-center justify-center rounded-lg sm:h-64 sm:w-64">
            <p className="text-white">{props.name}</p>
        </div>
    );
}

const Admin = () => {
    const role = useSelector(selectRole);
    // Check if the user has admin role, if not redirect to a different page
    if (role !== 'admin') {
        return <Navigate to="/" />; // Assuming you have a login page, change this accordingly
    }

    
    
    return ( 
        <div className="flex flex-col justify-center items-center h-screen sm:flex-row">
            <Link to="/admin-scholarship" className="flex flex-wrap justify-center">
                <Box name="Scholarship"/>
            </Link>
            <Link to="/admin-chats" className="flex flex-wrap justify-center">
                <Box name="Chats"/>
            </Link>
            <Link to="/admin-blogs" className="flex flex-wrap justify-center">
                <Box name="Blog"/>
            </Link>
        </div>
    );
}
 
export default Admin;