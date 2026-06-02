import Job from "../models/Job.js";

export const createJob = async (
  req,
  res
) => {
  try {
    const job = await Job.create(
      req.body
    );

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobs = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit = 10;

    const skip =
      (page - 1) * limit;

    const country =
      req.query.country;

    const filter = {};

    if (country) {
      filter.country = {
        $regex: country,
        $options: "i",
      };
    }

    const jobs = await Job.find(
      filter
    )
      .sort({
        postingDate: -1,
      })
      .skip(skip)
      .limit(limit);

    const total =
      await Job.countDocuments(
        filter
      );

    res.status(200).json({
      success: true,
      jobs,
      currentPage: page,
      totalPages: Math.ceil(
        total / limit
      ),
      totalJobs: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleJob =
  async (req, res) => {
    try {
      const job =
        await Job.findById(
          req.params.id
        );

      if (!job) {
        return res.status(404).json({
          success: false,
          message:
            "Job Not Found",
        });
      }

      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateJob =
  async (req, res) => {
    try {
      const job =
        await Job.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!job) {
        return res.status(404).json({
          success: false,
          message:
            "Job Not Found",
        });
      }

      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const deleteJob =
  async (req, res) => {
    try {
      const job =
        await Job.findByIdAndDelete(
          req.params.id
        );

      if (!job) {
        return res.status(404).json({
          success: false,
          message:
            "Job Not Found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Job Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };