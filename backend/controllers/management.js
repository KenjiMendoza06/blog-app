import mongoose from "mongoose";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const getAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: "Admins not found" });
  }
});
