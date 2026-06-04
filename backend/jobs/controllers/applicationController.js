import JobApplication from "../models/JobApplication.js";

export const applyJob = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    const {
      jobId,
      name,
      email,
      phone,
    } = req.body;

    if (
      !jobId ||
      !name ||
      !email ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    const application =
      await JobApplication.create({
        jobId,
        name,
        email,
        phone,

        resume: {
          data: req.file.buffer,
          fileName:
            req.file.originalname,
          contentType:
            req.file.mimetype,
        },
      });

    console.log(
      "APPLICATION SAVED:",
      application._id
    );

    res.status(201).json({
      success: true,
      message:
        "Application Submitted Successfully",
      applicationId:
        application._id,
    });
  } catch (error) {
    console.log(error);

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
          .select(
            "-resume.data"
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

export const getResume =
  async (req, res) => {
    try {
      const application =
        await JobApplication.findById(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application Not Found",
        });
      }

      res.set(
        "Content-Type",
        application.resume.contentType
      );

      res.set(
        "Content-Disposition",
        `inline; filename="${application.resume.fileName}"`
      );

      res.send(
        application.resume.data
      );
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