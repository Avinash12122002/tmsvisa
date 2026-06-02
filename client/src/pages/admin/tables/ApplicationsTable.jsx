import {
  useNavigate,
} from "react-router-dom";

import StatusBadge
from "../components/StatusBadge";

const ApplicationsTable = ({
  applications,
}) => {

  const navigate =
    useNavigate();

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow
        overflow-x-auto
      "
    >

      <table className="w-full">

        {/* TABLE HEADER */}

        <thead className="bg-gray-100">

          <tr>

            <th
              className="
                p-4
                text-left
                font-semibold
              "
            >
              Application ID
            </th>

            <th
              className="
                p-4
                text-left
                font-semibold
              "
            >
              Name
            </th>

            <th
              className="
                p-4
                text-left
                font-semibold
              "
            >
              Email
            </th>

            <th
              className="
                p-4
                text-left
                font-semibold
              "
            >
              Passport
            </th>

            <th
              className="
                p-4
                text-left
                font-semibold
              "
            >
              Country
            </th>

            <th
              className="
                p-4
                text-left
                font-semibold
              "
            >
              Status
            </th>

            <th
              className="
                p-4
                text-left
                font-semibold
              "
            >
              Date
            </th>

            <th
              className="
                p-4
                text-left
                font-semibold
              "
            >
              Action
            </th>

          </tr>

        </thead>

        {/* TABLE BODY */}

        <tbody>

          {applications?.length > 0 ? (

            applications.map(
              (app) => (

                <tr
                  key={app._id}
                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "
                >

                  {/* APPLICATION ID */}

                  <td className="p-4 font-medium">
                    {app.applicationId || "-"}
                  </td>

                  {/* NAME */}

                  <td className="p-4">
                    {app.applicantName || "-"}
                  </td>

                  {/* EMAIL */}

                  <td className="p-4">
                    {app.email || "-"}
                  </td>

                  {/* PASSPORT */}

                  <td className="p-4">
                    {app.passportNumber || "-"}
                  </td>

                  {/* COUNTRY */}

                  <td className="p-4">
                    {app.country || "-"}
                  </td>

                  {/* STATUS */}

                  <td className="p-4">

                    <StatusBadge
                      status={app.status}
                    />

                  </td>

                  {/* DATE */}

                  <td className="p-4">

                    {
                      new Date(
                        app.createdAt
                      ).toLocaleDateString()
                    }

                  </td>

                  {/* ACTION */}

                  <td className="p-4">

                    <button

                      onClick={() =>
                        navigate(
                          `/admin/applications/${app._id}`
                        )
                      }

                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        font-medium
                        transition
                      "
                    >

                      View

                    </button>

                  </td>

                </tr>
              )
            )

          ) : (

            <tr>

              <td
                colSpan="8"
                className="
                  text-center
                  p-10
                  text-gray-500
                "
              >
                No Applications Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default ApplicationsTable;