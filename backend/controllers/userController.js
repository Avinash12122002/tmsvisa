import User from "../models/User.js";

// ======================
// GET ALL USERS
// ======================

export const getUsers =
  async (req, res) => {

    try {

     const users =
        await User.find({
          role: "user",
        })
          .select("-password")
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        users
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };