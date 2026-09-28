export const customers = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", phone: "98100 11223", status: "Active", joined: "2026-01-12", plan: "Premium" },
  { id: 2, name: "Priya Verma", email: "priya@example.com", phone: "98111 22334", status: "Active", joined: "2026-02-03", plan: "Standard" },
  { id: 3, name: "Rohit Gupta", email: "rohit@example.com", phone: "98222 33445", status: "Inactive", joined: "2025-11-20", plan: "Basic" },
  { id: 4, name: "Neha Singh", email: "neha@example.com", phone: "98333 44556", status: "Pending", joined: "2026-08-15", plan: "Standard" },
  { id: 5, name: "Kabir Khan", email: "kabir@example.com", phone: "98444 55667", status: "Active", joined: "2026-05-09", plan: "Premium" },
  { id: 6, name: "Sneha Iyer", email: "sneha@example.com", phone: "98555 66778", status: "Inactive", joined: "2025-09-01", plan: "Basic" },
];

export const serviceRequests = [
  { id: "SR-1041", customer: "Aarav Sharma", service: "Installation", date: "2026-09-25", status: "Pending" },
  { id: "SR-1040", customer: "Priya Verma", service: "Maintenance", date: "2026-09-24", status: "In Progress" },
  { id: "SR-1039", customer: "Kabir Khan", service: "Repair", date: "2026-09-22", status: "Completed" },
  { id: "SR-1038", customer: "Neha Singh", service: "Consultation", date: "2026-09-21", status: "Pending" },
  { id: "SR-1037", customer: "Rohit Gupta", service: "Upgrade", date: "2026-09-19", status: "Completed" },
];

export const summary = { activeServices: 128, pendingRequests: 14, revenue: "₹4,82,500" };
