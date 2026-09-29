import { useEffect, useState } from "react";

// Simulates a network delay so the UI has something real to show for a
// "Loading" state, even though everything is mock data under the hood.
export function useMockLoading(delay = 500) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
}
