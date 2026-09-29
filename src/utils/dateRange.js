// Small date-range helpers used to derive "dynamic" mock numbers.
// Nothing here is hardcoded per range - everything is computed from the
// underlying mock data, so changing the data changes the numbers everywhere.

export function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export function isWithinRange(dateStr, range) {
  const date = new Date(dateStr);
  const now = new Date();

  if (range === "today") {
    return date.toDateString() === now.toDateString();
  }
  if (range === "week") {
    const start = new Date(now);
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return date >= start && date <= now;
  }
  if (range === "month") {
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }
  return true;
}

// Derives the 4 dashboard summary numbers for a given date range.
// Total Customers stays a running total (it's a headcount, not a per-period
// event); the other three are computed only from requests inside the range.
export function getSummaryStats(requests, customers, range) {
  const inRange = requests.filter((r) => isWithinRange(r.date, range));
  const activeServices = inRange.filter((r) => r.status === "In Progress").length;
  const pendingRequests = inRange.filter((r) => r.status === "Pending").length;
  const revenue = inRange
    .filter((r) => r.status === "Completed")
    .reduce((sum, r) => sum + r.amount, 0);

  return {
    totalCustomers: customers.length,
    activeServices,
    pendingRequests,
    revenue: `₹${revenue.toLocaleString("en-IN")}`,
  };
}
