import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getSingleJob } from "../api/jobApi";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const data = await getSingleJob(id);
      setJob(data.job);
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return (
      <div className="jd-loading">
        <div className="jd-loading__spinner" />
        <span>Loading job details...</span>
      </div>
    );
  }

  return (
    <div className="jd-page">
      <div className="jd-page__bg-accent" aria-hidden="true" />

      <div className="jd-container">
        {/* Back */}
        <button className="jd-back" onClick={() => navigate(-1)}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Jobs
        </button>

        {/* Card */}
        <div className="jd-card">
          {/* Badge row */}
          <div className="jd-card__badges">
            <span className="jd-card__badge jd-card__badge--country">{job.country}</span>
            <span className="jd-card__badge jd-card__badge--date">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Posted: {new Date(job.postingDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>

          {/* Title */}
          <h1 className="jd-card__title">{job.title}</h1>
          <div className="jd-card__divider" />

          {/* Description */}
          <h2 className="jd-card__section-title">Job Description</h2>
          <div className="jd-card__description">{job.description}</div>

          {/* CTA */}
          <div className="jd-card__cta">
            <Link
              to={`/jobs/apply/${job._id}`}
              className="jd-card__apply-btn"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4 20-7z" />
              </svg>
              Apply Now
            </Link>
            <button className="jd-card__share-btn" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}