import { createContext, useContext, useState } from "react";
import { customers as initial } from "../data/mockData";

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState(initial);

  const addCustomer = (data) =>
    setCustomers((prev) => [
      { ...data, id: Date.now(), joined: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);

  return <CustomerContext.Provider value={{ customers, addCustomer }}>{children}</CustomerContext.Provider>;
}

export const useCustomers = () => useContext(CustomerContext);
