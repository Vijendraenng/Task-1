import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = pathname.replace("/", "") || "dashboard";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="md:hidden border rounded px-2 py-1" onClick={onMenuClick} aria-label="Menu">☰</button>
        <h1 className="font-semibold capitalize">{title}</h1>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="hidden sm:inline text-gray-500">{user}</span>
        <button onClick={handleLogout} className="border rounded px-3 py-1 hover:bg-slate-50">Log out</button>
      </div>
    </header>
  );
}
