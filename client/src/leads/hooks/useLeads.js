import {
  useEffect,
  useState,
} from "react";

import {
  getLeads,
} from "../api/leadApi";

export default function useLeads(
  filters = {}
) {
  const [leads, setLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const fetchLeads =
    async () => {
      try {
        setLoading(true);

        const data =
          await getLeads(filters);

        setLeads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchLeads();
  }, []);

  return {
    leads,
    loading,
    error,
    refresh: fetchLeads,
  };
}