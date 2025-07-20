import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "login";

  const { loginUser, registerUser } = useContext(AuthContext);

  // Common input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    const success = await loginUser({ email, password });
    if (success) {
      navigate("/");
    } else {
      alert("فشل تسجيل الدخول. تأكد من البريد وكلمة المرور.");
    }
  };

  const handleRegister = async () => {
    const success = await registerUser({ name, email, password });
    if (success) {
      navigate("/");
    } else {
      alert("فشل التسجيل. تأكد من البيانات.");
    }
  };

  return type === "login" ? (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
    />
  ) : (
    <RegisterForm
      name={name}
      email={email}
      password={password}
      onNameChange={setName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleRegister}
    />
  );
};

export default AuthPage;
