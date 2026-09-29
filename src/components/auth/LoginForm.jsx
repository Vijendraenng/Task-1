import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!email.trim()) err.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Enter a valid email address.";
    if (!password) err.password = "Password is required.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-1">Service Desk</h1>
      <p className="text-sm text-gray-500 mb-6">Log in to manage customers and requests.</p>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        className="mb-3"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        className="mb-4"
      />

      <Button type="submit" className="w-full">Log in</Button>
      <p className="text-xs text-gray-400 mt-4 text-center">
        Demo only — no real authentication. Any valid email with a non-empty password works.
      </p>
    </form>
  );
}
