import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import PostForm from "./pages/PostForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Add Post */}
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />

        {/* Edit Post */}
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
