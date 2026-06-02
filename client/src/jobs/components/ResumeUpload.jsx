import { useState } from "react";

export default function ResumeUpload({
  setResume,
}) {
  const [fileName, setFileName] =
    useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setResume(file);

    setFileName(file.name);
  };

  return (
    <div>
      <label className="block mb-2 font-medium">
        Upload Resume
      </label>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      {fileName && (
        <p className="mt-2 text-green-600">
          {fileName}
        </p>
      )}
    </div>
  );
}