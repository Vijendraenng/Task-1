import { useState } from "react";

export default function AddCustomerForm({ onSave }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", plan: "Basic", status: "Active" });
  const [error, setError] = useState("");
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSave = () => {
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Name and a valid email are required.");
      return;
    }
    onSave(form);
  };

  const input = "w-full border rounded px-3 py-2 mb-3";

  return (
    <div>
      <input placeholder="Full name" className={input} value={form.name} onChange={set("name")} />
      <input placeholder="Email" className={input} value={form.email} onChange={set("email")} />
      <input placeholder="Phone" className={input} value={form.phone} onChange={set("phone")} />
      <div className="flex gap-3">
        <select className={input} value={form.plan} onChange={set("plan")}>
          <option>Basic</option><option>Standard</option><option>Premium</option>
        </select>
        <select className={input} value={form.status} onChange={set("status")}>
          <option>Active</option><option>Inactive</option><option>Pending</option>
        </select>
      </div>
      {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
      <button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
        Save customer
      </button>
    </div>
  );
}
