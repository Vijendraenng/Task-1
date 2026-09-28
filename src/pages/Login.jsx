import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <LoginForm onSubmit={(email) => { login(email); navigate("/dashboard"); }} />
    </div>
  );
}
