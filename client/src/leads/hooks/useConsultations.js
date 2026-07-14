import {
  useEffect,
  useState,
} from "react";

import {
  getConsultations,
} from "../api/consultationApi";

export default function useConsultations(
  filters = {}
) {
  const [consultations, setConsultations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const fetchConsultations =
    async () => {
      try {
        setLoading(true);

        const data =
          await getConsultations(filters);

        setConsultations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchConsultations();
  }, []);

  return {
    consultations,
    loading,
    error,
    refresh: fetchConsultations,
  };
}