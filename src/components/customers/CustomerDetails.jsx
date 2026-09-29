import Badge from "../ui/Badge";

export default function CustomerDetails({ customer }) {
  return (
    <dl className="grid grid-cols-3 gap-y-2 text-sm">
      <dt className="text-gray-500">Email</dt>
      <dd className="col-span-2 break-all">{customer.email}</dd>

      <dt className="text-gray-500">Phone</dt>
      <dd className="col-span-2">{customer.phone || "—"}</dd>

      <dt className="text-gray-500">Plan</dt>
      <dd className="col-span-2">{customer.plan || "—"}</dd>

      <dt className="text-gray-500">Status</dt>
      <dd className="col-span-2"><Badge status={customer.status} /></dd>

      <dt className="text-gray-500">Joined</dt>
      <dd className="col-span-2">{customer.joined}</dd>
    </dl>
  );
}
