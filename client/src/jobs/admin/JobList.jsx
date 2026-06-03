import {
  useEffect,
  useState,
} from "react";

import {
  getJobs,
  deleteJob,
} from "../api/jobApi";

import {
  Link,
} from "react-router-dom";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";

export default function JobList() {
  const [jobs, setJobs] =
    useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs =
    async () => {
      const data =
        await getJobs();

      setJobs(data.jobs);
    };

  const removeJob =
    async (id) => {
      if (
        !window.confirm(
          "Delete Job?"
        )
      )
        return;

      await deleteJob(id);

      loadJobs();
    };

  return (
    <AdminLayout>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Jobs
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="p-3">
              Title
            </th>
            <th className="p-3">
              Country
            </th>
            <th className="p-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job._id}
            >
              <td className="border p-3">
                {job.title}
              </td>

              <td className="border p-3">
                {job.country}
              </td>

              <td className="border p-3 flex gap-3">
                <Link
                  to={`/admin/jobs/edit/${job._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    removeJob(
                      job._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </AdminLayout>
  );
}