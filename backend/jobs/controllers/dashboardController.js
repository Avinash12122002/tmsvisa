import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalJobs =
      await Job.countDocuments();

    const totalApplications =
      await JobApplication.countDocuments();

    const activeJobs =
      await Job.countDocuments({
        status: "active",
      });

    const countries =
      await Job.distinct("country");

    res.status(200).json({
      success: true,
      totalJobs,
      totalApplications,
      activeJobs,
      countriesCovered:
        countries.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};