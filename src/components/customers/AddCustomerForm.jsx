import { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const STATUS_OPTIONS = ["Active", "Inactive", "Pending"];

export default function AddCustomerForm({ onSave }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", status: "Active" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // success UI state

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) err.phone = "Enter a valid phone number.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitted(true);
    // Small delay so the success state is visible before the modal closes.
    setTimeout(() => onSave(form), 700);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-3xl mb-2" aria-hidden>✓</div>
        <p className="font-medium">Customer added successfully</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <Input label="Name" value={form.name} onChange={set("name")} error={errors.name} />
      <Input label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} />
      <Input
        label="Phone"
        value={form.phone}
        onChange={set("phone")}
        error={errors.phone}
        placeholder="e.g. 98765 43210"
      />
      <Select label="Status" value={form.status} onChange={set("status")} options={STATUS_OPTIONS} />
      <Button type="submit" className="w-full mt-2">Save customer</Button>
    </form>
  );
}
