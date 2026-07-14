import LeadStatusBadge from "./LeadStatusBadge";

export default function ConsultationTable({
  consultations,
  onView,
  onDelete,
}) {
  if (!consultations?.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          No Consultation Leads Found
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Leads will appear here when visitors submit the popup form.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full table-fixed text-xs">

        <thead className="bg-slate-100">
          <tr className="text-gray-700">

            <th className="px-2 py-2 text-left w-[20%]">
              Name
            </th>

            <th className="px-2 py-2 text-left w-[20%]">
              WhatsApp
            </th>

            {/*

            <th className="px-2 py-2 text-left">
              Popup Heading
            </th>

            <th className="px-2 py-2 text-left">
              Source Page
            </th>

            */}

            <th className="px-2 py-2 text-center w-[12%]">
              Status
            </th>

            <th className="px-2 py-2 text-left w-[24%]">
              Notes
            </th>

            <th className="px-2 py-2 text-center w-[12%]">
              Created
            </th>

            <th className="px-2 py-2 text-center w-[12%]">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {consultations.map((item) => (

            <tr
              key={item._id}
              className="border-b hover:bg-gray-50"
            >

              <td className="px-2 py-2 truncate font-medium">
                {item.name}
              </td>

              <td className="px-2 py-2 truncate">
                {item.countryCode} {item.whatsapp}
              </td>

              {/*
              <td className="px-2 py-2 truncate">
                {item.heading || "-"}
              </td>

              <td className="px-2 py-2 truncate">
                {item.sourceUrl || "-"}
              </td>
              */}

              <td className="px-2 py-2 text-center">
                <LeadStatusBadge
                  status={item.status}
                />
              </td>

              <td className="px-2 py-2 truncate">
                {item.notes || "-"}
              </td>

              <td className="px-2 py-2 text-center whitespace-nowrap">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>

              <td className="px-2 py-2">

                <div className="flex justify-center gap-1">

                  <button
                    onClick={() => onView(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] px-2 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onDelete(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-[11px] px-2 py-1 rounded"
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
  );
}