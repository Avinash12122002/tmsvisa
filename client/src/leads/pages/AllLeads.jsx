import { useState } from "react";

import AdminLayout from "../../pages/admin/layouts/AdminLayout";

import useLeads from "../hooks/useLeads";

import LeadTable from "../components/LeadTable";

import UpdateLeadModal from "../components/UpdateLeadModal";

import {
  deleteLead,
} from "../api/leadApi";

export default function AllLeads() {

  const {
    leads,
    loading,
    refresh,
  } = useLeads();

  const [
    selectedLead,
    setSelectedLead,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

 const filteredLeads =
  (leads || []).filter((lead) => {

      const text = `
        ${lead.name}
        ${lead.email}
        ${lead.phone}
        ${lead.country}
        ${lead.service}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

  const handleDelete =
    async (id) => {

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

          <h1 className="text-4xl font-bold text-slate-800">
            All Leads
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all incoming leads
          </p>

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
            placeholder="Search leads..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
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
              p-10
              rounded-2xl
              shadow
              text-center
            "
          >
            Loading Leads...
          </div>

        ) : (

          <LeadTable
            leads={filteredLeads}
            onView={
              setSelectedLead
            }
            onDelete={
              handleDelete
            }
          />

        )}

        {selectedLead && (

          <UpdateLeadModal
            lead={selectedLead}
            onClose={() =>
              setSelectedLead(
                null
              )
            }
            onUpdated={() => {
              refresh();

              setSelectedLead(
                null
              );
            }}
          />

        )}

      </div>

    </AdminLayout>
  );
}