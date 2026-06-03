import LeadStatusBadge from "./LeadStatusBadge";

export default function LeadTable({
  leads,
  onView,
  onDelete,
}) {
  if (!leads?.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">
        <h3 className="text-xl font-semibold text-gray-700">
          No Leads Found
        </h3>

        <p className="text-gray-500 mt-2">
          Leads will appear here when users submit forms.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Service
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Country
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Phone
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Notes
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Created
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr
                key={lead._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4">
                  {lead.name}
                </td>

                <td className="px-4 py-4">
                  {lead.service}
                </td>

                <td className="px-4 py-4">
                  {lead.country}
                </td>

                <td className="px-4 py-4">
                  {lead.phone}
                </td>

                <td className="px-4 py-4">
                  {lead.email}
                </td>

                <td className="px-4 py-4">
                  <LeadStatusBadge
                    status={lead.status}
                  />
                </td>

                <td className="px-4 py-4 max-w-[250px]">
                  <div className="truncate">
                    {lead.notes || "-"}
                  </div>
                </td>

                <td className="px-4 py-4">
                  {new Date(
                    lead.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-4">

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() => onView(lead)}
                      className="
                        px-3
                        py-2
                        rounded-lg
                        bg-blue-600
                        text-white
                        text-sm
                        hover:bg-blue-700
                      "
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        onDelete(lead._id)
                      }
                      className="
                        px-3
                        py-2
                        rounded-lg
                        bg-red-600
                        text-white
                        text-sm
                        hover:bg-red-700
                      "
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}