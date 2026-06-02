import JobApplication from "../models/JobApplication.js";

export const applyJob = async (
  req,
  res
) => {
  try {
    const {
      jobId,
      name,
      email,
      phone,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume Required",
      });
    }

    const application =
      await JobApplication.create({
        jobId,
        name,
        email,
        phone,
        resume: req.file.path,
      });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplications =
  async (req, res) => {
    try {
      const applications =
        await JobApplication.find()
          .populate(
            "jobId",
            "title country"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const deleteApplication =
  async (req, res) => {
    try {
      const application =
        await JobApplication.findByIdAndDelete(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application Not Found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Application Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };