import { useState } from "react";

import AdminLayout from "../../pages/admin/layouts/AdminLayout";
import useLeads from "../hooks/useLeads";
import LeadTable from "../components/LeadTable";
import UpdateLeadModal from "../components/UpdateLeadModal";

import { deleteLead } from "../api/leadApi";

export default function VisaCourseLeads() {

  const {
    leads,
    loading,
    refresh,
  } = useLeads({
    service: "Visa Courses",
  });

  const [
    selectedLead,
    setSelectedLead,
  ] = useState(null);

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this lead?"
      );

    if (!confirmDelete) return;

    try {

      await deleteLead(id);

      refresh();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to delete lead"
      );

    }
  };

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            Visa Course Leads
          </h1>

          <p className="text-gray-500 mt-2">
            Manage Visa Course enquiries
          </p>
        </div>

        {loading ? (

          <div className="bg-white p-10 rounded-2xl shadow text-center">
            Loading...
          </div>

        ) : (

          <LeadTable
            leads={leads}
            onView={setSelectedLead}
            onDelete={handleDelete}
          />

        )}

        {selectedLead && (

          <UpdateLeadModal
            lead={selectedLead}
            onClose={() =>
              setSelectedLead(null)
            }
            onUpdated={() => {

              refresh();

              setSelectedLead(null);

            }}
          />

        )}

      </div>

    </AdminLayout>
  );
}