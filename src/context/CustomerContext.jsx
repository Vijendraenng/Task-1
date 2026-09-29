import { createContext, useContext, useState } from "react";
import { customers as initialCustomers } from "../data/mockData";

const CustomerContext = createContext(null);

// Holds the customer list in memory so the Dashboard's "Total Customers"
// card and the Customers page always agree, without prop drilling.
export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState(initialCustomers);

  const addCustomer = (data) =>
    setCustomers((prev) => [
      { ...data, id: Date.now(), joined: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);

  return (
    <CustomerContext.Provider value={{ customers, addCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomers = () => useContext(CustomerContext);
