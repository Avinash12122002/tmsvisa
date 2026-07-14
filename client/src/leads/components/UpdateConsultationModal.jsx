import { useState } from "react";
import { updateConsultation } from "../api/consultationApi";

export default function UpdateConsultationModal({
  consultation,
  onClose,
  onUpdated,
}) {
  const [status, setStatus] = useState(consultation.status);
  const [notes, setNotes] = useState(consultation.notes || "");

  const handleUpdate = async () => {
    try {
      await updateConsultation(consultation._id, {
        status,
        notes,
      });

      onUpdated();
    } catch (error) {
      console.log(error);
      alert("Failed to update consultation lead");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-lg font-semibold">
            Consultation Lead
          </h2>

          <button
            onClick={onClose}
            className="text-xl leading-none hover:text-red-600"
          >
            ×
          </button>

        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">

          <div>
            <span className="font-semibold">Name</span>
            <p className="truncate">{consultation.name}</p>
          </div>

          <div>
            <span className="font-semibold">WhatsApp</span>
            <p>
              {consultation.countryCode} {consultation.whatsapp}
            </p>
          </div>

          <div className="col-span-2">
            <span className="font-semibold">Submitted</span>
            <p>{new Date(consultation.createdAt).toLocaleString()}</p>
          </div>

          {/* Uncomment if needed

          <div className="col-span-2">
            <span className="font-semibold">Popup Heading</span>
            <p>{consultation.heading || "-"}</p>
          </div>

          <div className="col-span-2">
            <span className="font-semibold">Source Page</span>
            <p className="truncate">{consultation.sourceUrl || "-"}</p>
          </div>

          */}

        </div>

        <div className="mt-4">

          <label className="block text-sm font-medium mb-1">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>

        </div>

        <div className="mt-3">

          <label className="block text-sm font-medium mb-1">
            Notes
          </label>

          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
          />

        </div>

        <div className="flex justify-end gap-2 mt-4">

          <button
            onClick={onClose}
            className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}