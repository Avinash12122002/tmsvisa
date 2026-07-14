import AdminLayout from "../../pages/admin/layouts/AdminLayout";

import useConsultations from "../hooks/useConsultations";
import useLeadsListPage from "../hooks/useLeadsListPage";

import ConsultationTable from "../components/ConsultationTable";
import UpdateConsultationModal from "../components/UpdateConsultationModal";

import {
  deleteConsultation,
} from "../api/consultationApi";

export default function ConsultationLeads() {

  const {
    consultations,
    loading,
    refresh,
  } = useConsultations();

  const {
    selectedItem: selectedConsultation,
    setSelectedItem: setSelectedConsultation,
    search,
    setSearch,
    page,
    totalPages,
    goToPrevPage,
    goToNextPage,
    filteredItems: filteredConsultations,
    paginatedItems: paginatedConsultations,
    pendingDeleteId,
    requestDelete,
    cancelDelete,
    confirmDelete,
    deletingId,
  } = useLeadsListPage({
    items: consultations,
    deleteFn: deleteConsultation,
    refresh,
    searchFields: ["name", "whatsapp"],
  });

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div className="flex items-center justify-between flex-wrap gap-2">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Consultation Leads
            </h1>

            <p className="text-gray-500 mt-2">
              Leads captured from the site-wide popup form
            </p>

          </div>

          {!loading && (
            <div className="bg-white px-4 py-2 rounded-xl shadow text-sm text-slate-600 font-medium">
              {filteredConsultations.length} of {(consultations || []).length}{" "}
              lead{(consultations || []).length === 1 ? "" : "s"}
            </div>
          )}

        </div>

        <div
          className="
            bg-white
            p-4
            rounded-2xl
            shadow
          "
        >

          <input
            type="text"
            placeholder="Search by name or WhatsApp number..."
            value={search}
            onChange={setSearch}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        {loading ? (

          <div
            className="
              bg-white
              p-4
              rounded-2xl
              shadow
              space-y-3
            "
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>

        ) : filteredConsultations.length === 0 ? (

          <div
            className="
              bg-white
              p-10
              rounded-2xl
              shadow
              text-center
              text-gray-500
            "
          >
            No consultation leads found.
          </div>

        ) : (

          <>

            <ConsultationTable
              consultations={paginatedConsultations}
              onView={setSelectedConsultation}
              onDelete={requestDelete}
              deletingId={deletingId}
            />

            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow">

                <button
                  onClick={goToPrevPage}
                  disabled={page === 1}
                  className="
                    px-4 py-2 rounded-xl border
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-slate-50
                  "
                >
                  Previous
                </button>

                <span className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={goToNextPage}
                  disabled={page === totalPages}
                  className="
                    px-4 py-2 rounded-xl border
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-slate-50
                  "
                >
                  Next
                </button>

              </div>
            )}

          </>

        )}

        {selectedConsultation && (

          <UpdateConsultationModal
            consultation={selectedConsultation}
            onClose={() => setSelectedConsultation(null)}
            onUpdated={() => {
              refresh();
              setSelectedConsultation(null);
            }}
          />

        )}

        {pendingDeleteId && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm space-y-4">

              <h2 className="text-lg font-semibold text-slate-800">
                Delete consultation lead?
              </h2>

              <p className="text-gray-500 text-sm">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 pt-2">

                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-xl border hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>
  );
}