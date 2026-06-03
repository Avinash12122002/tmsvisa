import {
  useState,
} from "react";

import {
  updateLead,
} from "../api/leadApi";

export default function UpdateLeadModal({
  lead,
  onClose,
  onUpdated,
}) {

  const [
    status,
    setStatus,
  ] = useState(
    lead.status
  );

  const [
    notes,
    setNotes,
  ] = useState(
    lead.notes || ""
  );

  const handleUpdate =
    async () => {

      try {

        await updateLead(
          lead._id,
          {
            status,
            notes,
          }
        );

        onUpdated();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update lead"
        );
      }
    };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          w-full
          max-w-xl
          p-6
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-6
          "
        >

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="
              text-2xl
            "
          >
            ×
          </button>

        </div>

        <div className="space-y-4">

          <div>
            <strong>Name:</strong>{" "}
            {lead.name}
          </div>

          <div>
            <strong>Email:</strong>{" "}
            {lead.email}
          </div>

          <div>
            <strong>Phone:</strong>{" "}
            {lead.phone}
          </div>

          <div>
            <strong>WhatsApp:</strong>{" "}
            {lead.whatsapp}
          </div>

          <div>
            <strong>Country:</strong>{" "}
            {lead.country}
          </div>

          <div>
            <strong>Service:</strong>{" "}
            {lead.service}
          </div>

          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            >
              <option>
                New
              </option>

              <option>
                Contacted
              </option>

              <option>
                Converted
              </option>

            </select>

          </div>

          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Notes
            </label>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />

          </div>

        </div>

        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
          "
        >

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              border
            "
          >
            Cancel
          </button>

          <button
            onClick={
              handleUpdate
            }
            className="
              px-5
              py-2
              rounded-xl
              bg-blue-600
              text-white
            "
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}