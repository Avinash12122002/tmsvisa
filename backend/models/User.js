import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(

    {
      name: {
        type: String,

        required: true,
      },

      email: {
        type: String,

        required: true,

        unique: true,
      },

      password: {
        type: String,

        required: true,
      },

      // ======================
      // ROLE
      // ======================

      role: {

        type: String,

        enum: [
          "user",
          "admin",
        ],

        default: "user",
      },
    },

    {
      timestamps: true,
    },
  );

const User =
  mongoose.model(
    "TMSVISA",
    userSchema,
  );

export default User;