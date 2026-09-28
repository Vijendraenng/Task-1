import SummaryCard from "../components/dashboard/SummaryCard";
import RecentRequestsTable from "../components/dashboard/RecentRequestsTable";
import { useCustomers } from "../context/CustomerContext";
import { serviceRequests, summary } from "../data/mockData";

export default function Dashboard() {
  const { customers } = useCustomers();
  const cards = [
    { label: "Total Customers", value: customers.length },
    { label: "Active Services", value: summary.activeServices },
    { label: "Pending Requests", value: summary.pendingRequests },
    { label: "Revenue", value: summary.revenue },
  ];

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {cards.map((c) => <SummaryCard key={c.label} {...c} />)}
      </div>
      <RecentRequestsTable requests={serviceRequests} />
    </>
  );
}
