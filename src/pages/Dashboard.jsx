import { useMemo, useState } from "react";
import SummaryCard from "../components/dashboard/SummaryCard";
import DateRangeFilter from "../components/dashboard/DateRangeFilter";
import RecentRequestsTable from "../components/dashboard/RecentRequestsTable";
import Skeleton from "../components/ui/Skeleton";
import { useMockLoading } from "../hooks/useMockLoading";
import { useCustomers } from "../context/CustomerContext";
import { serviceRequests } from "../data/mockData";
import { getSummaryStats } from "../utils/dateRange";

export default function Dashboard() {
  const { customers } = useCustomers();
  const [range, setRange] = useState("week");
  const loading = useMockLoading(600);

  const stats = useMemo(
    () => getSummaryStats(serviceRequests, customers, range),
    [customers, range]
  );

  const cards = [
    { label: "Total Customers", value: stats.totalCustomers },
    { label: "Active Services", value: stats.activeServices },
    { label: "Pending Requests", value: stats.pendingRequests },
    { label: "Revenue", value: stats.revenue },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-sm text-gray-500">Overview for the selected period</p>
        <DateRangeFilter value={range} onChange={setRange} />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)
          : cards.map((c) => <SummaryCard key={c.label} {...c} />)}
      </div>

      {loading ? <Skeleton className="h-72" /> : <RecentRequestsTable requests={serviceRequests} />}
    </>
  );
}
