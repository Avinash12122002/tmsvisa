import Application from "../models/Application.js";

import generateApplicationId from "../utils/generateApplicationId.js";

// ======================
// CREATE APPLICATION
// ======================

export const createApplication =
  async (req, res) => {

    try {

      // ======================
      // DEBUG
      // ======================

      console.log(req.body);

      console.log(req.files);

      // ======================
      // FILES
      // ======================

      const uploadedFiles = {};

      // HANDLE MULTER FILES

      if (req.files) {

        Object.keys(req.files)
          .forEach((key) => {

            const fileArray =
              req.files[key];

            if (
              fileArray &&
              fileArray[0]
            ) {

              uploadedFiles[key] =
                fileArray[0].path;
            }
          });
      }

      // ======================
      // BODY
      // ======================

      const parsedBody = {

        ...req.body,
      };

      // ======================
      // PARSE ARRAYS
      // ======================

      [

        "otherNames",

        "otherNationalities",

        "familyMembers",

        "countryContacts",

        "travelHistory",

        "deniedCountries",

      ].forEach((field) => {

        if (
          parsedBody[field]
        ) {

          try {

            parsedBody[field] =

              JSON.parse(
                parsedBody[field]
              );

          } catch (error) {

            console.log(
              `Failed to parse ${field}`
            );
          }
        }
      });

      // ======================
      // NORMAL FILES
      // ======================

      Object.keys(
        uploadedFiles
      ).forEach((key) => {

        // SKIP TRAVEL VISA FILES

        if (

          !key.startsWith(
            "travelVisaFile_"
          )

        ) {

          parsedBody[key] =
            uploadedFiles[key];
        }
      });

      // ======================
      // TRAVEL VISA FILES
      // ======================

      if (
        parsedBody.travelHistory
      ) {

        parsedBody.travelHistory =
  parsedBody.travelHistory.map(
    (
      item,
      index
    ) => {

      const visaKey =
        `travelVisaFile_${index}`;

      // KEEP EXISTING VALUE
      // OR SAVE FILE PATH

      return {

        ...item,

        visaFile:

          uploadedFiles[
            visaKey
          ]

          ||

          item.visaFile

          ||

          null,
      };
    }
  );
      }

      // ======================
      // CREATE APPLICATION
      // ======================

      const application =

        await Application.create({

          user:
            req.user._id,

          applicationId:
            generateApplicationId(
              parsedBody.country
            ),

          applicantName:`${parsedBody.firstName || ""} ${parsedBody.lastName || ""}`.trim(),

          email:
            parsedBody.email || "",

          phone:
            parsedBody.phone || "",

          passportNumber:
            parsedBody.passportNumber || "",

          country:
            parsedBody.country || "Unknown",

          progress:
            parsedBody.progress || 0,

          formData:
            parsedBody,
        });

      // ======================
      // RESPONSE
      // ======================

      res.status(201).json({

        success: true,

        message:
          "Application Submitted Successfully",

        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",
      });
    }
  };
// ======================
// GET ALL APPLICATIONS
// ======================

export const getApplications =
  async (req, res) => {

    try {

      const applications =

        await Application.find()

          .sort({
            createdAt: -1,
          });

      res.json(
        applications
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",
      });
    }
  };

// ======================
// GET SINGLE APPLICATION
// ======================

export const getApplication =
  async (req, res) => {

    try {

      const application =

        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404).json({

          success: false,

          message:
            "Application not found",
        });
      }

      res.json(
        application
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",
      });
    }
  };

// ======================
// UPDATE STATUS
// ======================

export const updateApplicationStatus =
  async (req, res) => {

    try {

      const application =

        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404).json({

          success: false,

          message:
            "Application not found",
        });
      }

      application.status =
        req.body.status;

      await application.save();

      res.json({

        success: true,

        message:
          "Status updated successfully",

        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",
      });
    }
  };