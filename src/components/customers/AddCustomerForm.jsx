import { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const STATUS_OPTIONS = ["Active", "Inactive", "Pending"];
const NAME_MAX = 60;
const EMAIL_MAX = 80;

export default function AddCustomerForm({ onSave, existingEmails = [] }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", status: "Active" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false); // true while the 700ms confirmation is showing
  const [submitted, setSubmitted] = useState(false); // success UI state

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const err = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name) err.name = "Name is required.";
    else if (name.length > NAME_MAX) err.name = `Name must be ${NAME_MAX} characters or fewer.`;

    if (!email) err.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Enter a valid email address.";
    else if (email.length > EMAIL_MAX) err.email = `Email must be ${EMAIL_MAX} characters or fewer.`;
    else if (existingEmails.includes(email.toLowerCase())) {
      err.email = "A customer with this email already exists.";
    }

    if (!phone) err.phone = "Phone number is required.";
    else if (!/^[0-9+\-\s]{7,15}$/.test(phone)) err.phone = "Enter a valid phone number (7-15 digits).";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting || submitted) return; // guards against double-submit (double click, double Enter)

    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitting(true);
    setSubmitted(true);
    // Small delay so the success state is visible before the modal closes.
    setTimeout(() => onSave({ ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() }), 700);
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
      <Button type="submit" className="w-full mt-2" disabled={submitting}>
        {submitting ? "Saving…" : "Save customer"}
      </Button>
    </form>
  );
}
