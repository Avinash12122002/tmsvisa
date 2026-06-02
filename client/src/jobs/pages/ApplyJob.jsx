import {
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import ResumeUpload from "../components/ResumeUpload";

import {
  applyJob,
} from "../api/applicationApi";

export default function ApplyJob() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [resume, setResume] =
    useState(null);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
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

      const formData =
        new FormData();

      formData.append(
        "jobId",
        id
      );

      formData.append(
        "name",
        form.name
      );

      formData.append(
        "email",
        form.email
      );

      formData.append(
        "phone",
        form.phone
      );

      formData.append(
        "resume",
        resume
      );

      try {
        await applyJob(
          formData
        );

        alert(
          "Application Submitted"
        );

        navigate(
          "/work-opportunity"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Apply For Job
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={
            form.name
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            form.email
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={
            form.phone
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
          required
        />

        <ResumeUpload
          setResume={
            setResume
          }
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}