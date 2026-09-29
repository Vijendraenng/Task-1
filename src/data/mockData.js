import { daysAgo } from "../utils/dateRange";

// All mock data lives here, separate from any component. Swapping this file
// (or the two context files that read from it) for real API calls is the
// only change needed to wire up a real backend later.

export const customers = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", phone: "98100 11223", status: "Active", joined: daysAgo(120), plan: "Premium" },
  { id: 2, name: "Priya Verma", email: "priya@example.com", phone: "98111 22334", status: "Active", joined: daysAgo(95), plan: "Standard" },
  { id: 3, name: "Rohit Gupta", email: "rohit@example.com", phone: "98222 33445", status: "Inactive", joined: daysAgo(210), plan: "Basic" },
  { id: 4, name: "Neha Singh", email: "neha@example.com", phone: "98333 44556", status: "Pending", joined: daysAgo(12), plan: "Standard" },
  { id: 5, name: "Kabir Khan", email: "kabir@example.com", phone: "98444 55667", status: "Active", joined: daysAgo(60), plan: "Premium" },
  { id: 6, name: "Sneha Iyer", email: "sneha@example.com", phone: "98555 66778", status: "Inactive", joined: daysAgo(300), plan: "Basic" },
  { id: 7, name: "Vikram Rao", email: "vikram@example.com", phone: "98666 77889", status: "Active", joined: daysAgo(3), plan: "Standard" },
];

// `amount` powers the mock Revenue card; it is 0 for requests that never
// completed (Pending / In Progress / Cancelled) so it doesn't affect revenue.
export const serviceRequests = [
  { id: "SR-1041", customer: "Aarav Sharma", service: "Installation", date: daysAgo(0), status: "Pending", amount: 0 },
  { id: "SR-1040", customer: "Priya Verma", service: "Maintenance", date: daysAgo(1), status: "In Progress", amount: 0 },
  { id: "SR-1039", customer: "Kabir Khan", service: "Repair", date: daysAgo(2), status: "Completed", amount: 6800 },
  { id: "SR-1038", customer: "Neha Singh", service: "Consultation", date: daysAgo(3), status: "Pending", amount: 0 },
  { id: "SR-1037", customer: "Rohit Gupta", service: "Upgrade", date: daysAgo(5), status: "Completed", amount: 9200 },
  { id: "SR-1036", customer: "Sneha Iyer", service: "Installation", date: daysAgo(6), status: "Completed", amount: 5400 },
  { id: "SR-1035", customer: "Vikram Rao", service: "Consultation", date: daysAgo(4), status: "In Progress", amount: 0 },
  { id: "SR-1034", customer: "Aarav Sharma", service: "Repair", date: daysAgo(15), status: "Cancelled", amount: 0 },
  { id: "SR-1033", customer: "Priya Verma", service: "Consultation", date: daysAgo(20), status: "Completed", amount: 2800 },
  { id: "SR-1032", customer: "Kabir Khan", service: "Maintenance", date: daysAgo(28), status: "In Progress", amount: 0 },
  { id: "SR-1031", customer: "Rohit Gupta", service: "Installation", date: daysAgo(33), status: "Completed", amount: 7100 },
];
