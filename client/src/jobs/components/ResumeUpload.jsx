import { useState } from "react";

export default function ResumeUpload({ setResume }) {
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResume(file);
    setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setResume(file);
    setFileName(file.name);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold tracking-widest uppercase text-gray-500">
        Resume / CV
      </label>

      <label
        className={`relative flex flex-col items-center gap-2 border-2 border-dashed rounded-xl
                   px-6 py-7 cursor-pointer text-center transition-all duration-200
                   ${dragging
                     ? "border-red-500 bg-red-50 text-red-600"
                     : fileName
                       ? "border-green-500 bg-green-50 text-green-700"
                       : "border-gray-200 bg-gray-50 text-gray-400 hover:border-red-400 hover:bg-red-50 hover:text-red-500"
                   }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        {fileName ? (
          <>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-sm font-semibold">{fileName}</span>
            <span className="text-xs text-gray-400">Click to change file</span>
          </>
        ) : (
          <>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-sm font-medium">
              Drag & drop or <u>click to upload</u>
            </span>
            <span className="text-xs">PDF, DOC, DOCX supported</span>
          </>
        )}
      </label>
    </div>
  );
}