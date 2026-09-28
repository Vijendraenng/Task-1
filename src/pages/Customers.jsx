import { useMemo, useState } from "react";
import CustomerFilters from "../components/customers/CustomerFilters";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerDetails from "../components/customers/CustomerDetails";
import AddCustomerForm from "../components/customers/AddCustomerForm";
import Modal from "../components/ui/Modal";
import { useCustomers } from "../context/CustomerContext";

export default function Customers() {
  const { customers, addCustomer } = useCustomers();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);

  const filtered = useMemo(
    () =>
      customers.filter(
        (c) =>
          (status === "All" || c.status === status) &&
          (c.name + c.email).toLowerCase().includes(query.toLowerCase())
      ),
    [customers, query, status]
  );

  return (
    <>
      <CustomerFilters query={query} setQuery={setQuery} status={status} setStatus={setStatus} onAdd={() => setAdding(true)} />
      <CustomerTable customers={filtered} onView={setSelected} />

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <CustomerDetails customer={selected} />
        </Modal>
      )}
      {adding && (
        <Modal title="Add customer" onClose={() => setAdding(false)}>
          <AddCustomerForm onSave={(data) => { addCustomer(data); setAdding(false); }} />
        </Modal>
      )}
    </>
  );
}
