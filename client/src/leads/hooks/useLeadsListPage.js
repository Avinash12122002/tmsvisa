// hooks/useLeadsListPage.js
import { useState, useMemo, useEffect, useCallback } from "react";

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 300;

export default function useLeadsListPage({
  items,
  deleteFn,
  refresh,
  searchFields = ["name", "whatsapp", "email"],
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearchRaw] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const filteredItems = useMemo(() => {
    const list = items || [];
    if (!debouncedSearch) return list;

    return list.filter((item) => {
      const text = searchFields
        .map((f) => item[f] || "")
        .join(" ")
        .toLowerCase();
      return text.includes(debouncedSearch);
    });
  }, [items, debouncedSearch, searchFields]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, page]);

  const setSearch = useCallback((e) => setSearchRaw(e.target.value), []);

  const requestDelete = useCallback((id) => setPendingDeleteId(id), []);
  const cancelDelete = useCallback(() => setPendingDeleteId(null), []);

  const confirmDelete = useCallback(async () => {
    const id = pendingDeleteId;
    if (!id) return;

    setDeletingId(id);
    setPendingDeleteId(null);

    try {
      await deleteFn(id);
      refresh();
    } catch (error) {
      console.log(error);
      alert("Failed to delete lead");
    } finally {
      setDeletingId(null);
    }
  }, [pendingDeleteId, deleteFn, refresh]);

  const goToPrevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goToNextPage = useCallback(
    () => setPage((p) => Math.min(totalPages, p + 1)),
    [totalPages]
  );

  return {
    selectedItem,
    setSelectedItem,
    search,
    setSearch,
    page,
    totalPages,
    goToPrevPage,
    goToNextPage,
    filteredItems,
    paginatedItems,
    pendingDeleteId,
    requestDelete,
    cancelDelete,
    confirmDelete,
    deletingId,
  };
}