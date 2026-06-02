import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  getSingleJob,
} from "../api/jobApi";

export default function JobDetails() {
  const { id } =
    useParams();

  const [job, setJob] =
    useState(null);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob =
    async () => {
      try {
        const data =
          await getSingleJob(id);

        setJob(data.job);
      } catch (error) {
        console.log(error);
      }
    };

  if (!job) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        {job.title}
      </h1>

      <div className="bg-white shadow rounded-xl p-6">
        <p className="mb-3">
          <strong>
            Country:
          </strong>{" "}
          {job.country}
        </p>

        <p className="mb-3">
          <strong>
            Posted:
          </strong>{" "}
          {new Date(
            job.postingDate
          ).toLocaleDateString()}
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Description
          </h2>

          <p>
            {job.description}
          </p>
        </div>

        <Link
          to={`/jobs/apply/${job._id}`}
          className="inline-block mt-8 bg-red-600 text-white px-6 py-3 rounded"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}