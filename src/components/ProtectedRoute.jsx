import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect if not logged in
    return <Navigate to="/auth" />;
  }

  // Allow access
  return children;
}
