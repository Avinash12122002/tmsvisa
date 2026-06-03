import AdminLayout from "../../layouts/AdminLayout";
import useLeads from "../hooks/useLeads";
import LeadTable from "../components/LeadTable";

export default function VisaCourseLeads() {

  const {
    leads,
    loading,
  } = useLeads({
    service: "Visa Courses",
  });

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
            onView={() => {}}
            onDelete={() => {}}
          />
        )}

      </div>

    </AdminLayout>
  );
}