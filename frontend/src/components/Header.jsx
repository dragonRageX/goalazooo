import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import utilsContext from "../context/utilsContext";
import { toast } from "react-toastify";

export default function Header()
{
    const [USER_API_URL, user, setUser] = React.useContext(utilsContext);
    const navigate = useNavigate();

    function handleLogout()
    {
        localStorage.removeItem("user");   //destroy the localStorage 'user' item on logout
        setUser(null);
        toast.success("Logged Out successfully!");
        navigate("/");
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">GoalSetter</Link>
            </div>
            <ul>
                {user ? (   //if the 'user' global state does exist that means a user is logged in, and hence we only show a 'logout' button to the logged-in user in the header. And if no 'user' state exists, that means no user has logged-in yet and hence, we show the unauthenticated user a 'login' and 'register' links in the header
                    <li>
                        <button className="btn" onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}