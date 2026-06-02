import {
  useState,
} from "react";

import {
  createJob,
} from "../api/jobApi";
import AdminJobLayout from "../components/AdminJobLayout";

export default function JobCreate() {
  const [form, setForm] =
    useState({
      postingDate: "",
      country: "",
      countryCode: "",
      title: "",
      description: "",
      status: "active",
    });

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createJob(form);

        alert(
          "Job Created Successfully"
        );

        setForm({
          postingDate: "",
          country: "",
          countryCode: "",
          title: "",
          description: "",
          status: "active",
        });
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <AdminJobLayout>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Job
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        <input
          type="date"
          name="postingDate"
          value={
            form.postingDate
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={
            form.country
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="countryCode"
          placeholder="Country Code"
          value={
            form.countryCode
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={
            form.title
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        />

        <textarea
          rows="6"
          name="description"
          placeholder="Job Description"
          value={
            form.description
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-red-600 text-white px-6 py-3 rounded"
        >
          Create Job
        </button>
      </form>
      </div>
    </AdminJobLayout>
    
  );
}