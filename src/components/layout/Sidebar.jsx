import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/customers", label: "Customers" },
];

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside
      className={`${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        w-56 bg-slate-900 text-slate-200 p-4 fixed md:static inset-y-0 left-0 z-40
        transition-transform duration-200 ease-in-out`}
    >
      <div className="text-lg font-semibold text-white mb-6">Service Desk</div>
      <nav className="space-y-1" aria-label="Primary navigation">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-sm ${isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-800"}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
