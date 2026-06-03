import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getSingleJob,
  updateJob,
} from "../api/jobApi";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";

export default function JobEdit() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({});

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob =
    async () => {
      const data =
        await getSingleJob(id);

      setForm(data.job);
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      await updateJob(
        id,
        form
      );

      navigate(
        "/admin/jobs"
      );
    };

  return (
    <AdminLayout>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Job
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          value={
            form.title || ""
          }
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value,
            })
          }
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          rows="6"
          value={
            form.description ||
            ""
          }
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button className="bg-green-600 text-white px-6 py-3 rounded">
          Update
        </button>
      </form>
      </div>
      </AdminLayout>
  );
}