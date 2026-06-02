import CountryFlag from "./CountryFlag";
import {
  useNavigate,
} from "react-router-dom";

export default function JobTable({
  jobs,
}) {
  const navigate =
    useNavigate();

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-5 bg-red-600 text-white font-semibold p-4">
        <div>Date</div>
        <div>Country</div>
        <div>Job Title</div>
        <div>Description</div>
        <div>Apply</div>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="grid grid-cols-5 p-4 border-b items-center"
          >
            <div>
              {new Date(
                job.postingDate
              ).toLocaleDateString()}
            </div>

            <div>
              <CountryFlag
                country={
                  job.country
                }
              />
            </div>

            <div>
              {job.title}
            </div>

            <div>
              <button
                className="text-blue-600"
                onClick={() =>
                  navigate(
                    `/job/${job._id}`
                  )
                }
              >
                View
              </button>
            </div>

            <div>
              <button
                onClick={() =>
                  navigate(
                    `/jobs/apply/${job._id}`
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}