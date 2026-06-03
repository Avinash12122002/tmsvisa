import {
  useEffect,
  useState,
} from "react";

import {
  getApplications,
  deleteApplication,
} from "../api/applicationApi";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";

export default function Applications() {
  const [
    applications,
    setApplications,
  ] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications =
    async () => {
      const data =
        await getApplications();

      setApplications(
        data.applications
      );
    };

  const removeApplication =
    async (id) => {
      await deleteApplication(
        id
      );

      loadApplications();
    };

  return (
    <AdminLayout>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Applications
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-red-600 text-white">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map(
            (item) => (
              <tr
                key={
                  item._id
                }
              >
                <td className="border p-3">
                  {item.name}
                </td>

                <td className="border p-3">
                  {item.email}
                </td>

                <td className="border p-3">
                  {item.phone}
                </td>

                <td className="border p-3">
                  <a
                    href={`https://tmsvisa.onrender.com/${item.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    View
                  </a>
                </td>

                <td className="border p-3">
                  <button
                    onClick={() =>
                      removeApplication(
                        item._id
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      </div>
      </AdminLayout>
  );
}