import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Enter a valid email address.";
    if (password.length < 6) err.password = "Password must be at least 6 characters.";
    setErrors(err);
    if (!Object.keys(err).length) onSubmit(email);
  };

  const input = "w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-1">Service Desk</h1>
      <p className="text-sm text-gray-500 mb-6">Log in to manage customers and requests.</p>

      <label className="block text-sm font-medium mb-1">Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      <p className="text-xs text-red-600 mb-3 min-h-4">{errors.email}</p>

      <label className="block text-sm font-medium mb-1">Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
      <p className="text-xs text-red-600 mb-4 min-h-4">{errors.password}</p>

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-medium">Log in</button>
      <p className="text-xs text-gray-400 mt-4 text-center">Demo: any valid email + 6+ character password</p>
    </form>
  );
}
