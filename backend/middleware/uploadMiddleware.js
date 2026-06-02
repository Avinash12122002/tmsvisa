import multer from "multer";

import path from "path";

import fs from "fs";

// ======================
// CREATE UPLOADS FOLDER
// ======================


const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(uploadPath);
}

// ======================
// STORAGE
// ======================

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb,
    ) => {

      cb(
        null,
        uploadPath
      );
    },

    filename: (
      req,
      file,
      cb,
    ) => {

      const uniqueName =

        Date.now() +

        "-" +

        Math.round(
          Math.random() * 1E9
        ) +

        path.extname(
          file.originalname
        );

      cb(
        null,
        uniqueName
      );
    },
  });

// ======================
// FILE FILTER
// ======================

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [

    "application/pdf",

    "image/jpeg",

    "image/png",

    "image/jpg",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(
      null,
      true
    );

  } else {

    cb(
      new Error(
        "Only PDF, JPG, PNG files are allowed"
      )
    );
  }
};

// ======================
// UPLOAD
// ======================

const upload =
  multer({

    storage,

    fileFilter,

    limits: {

      fileSize:
        10 * 1024 * 1024,
    },
  });

export default upload;