import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // ✅ تسجيل الدخول
  const loginUser = async ({ email, password }) => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      const { accessToken, user } = res.data;
      setToken(accessToken);
        setUser(user);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("فشل تسجيل الدخول:", error);
      return false;
    }
  };

  // ✅ التسجيل
  const registerUser = async ({ name, email, password }) => {
    try {
      const res = await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });

      const { accessToken, user } = res.data;
      setToken(accessToken);
      setUser(user);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("فشل التسجيل:", error);
      return false;
    }
  };

  // ✅ تسجيل الخروج
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
