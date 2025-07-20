import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
         BlogApp
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/post"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ➕ Add Post
            </Link>
            <span className="text-gray-700">{user.name || user.email}</span>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth?type=login"
              className="text-blue-600 hover:underline"
            >
              Login
            </Link>
            <Link
              to="/auth?type=register"
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
