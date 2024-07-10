import asyncHandler from "express-async-handler";
import OverallStat from "../models/OverallStat.js";

// @desc    Fetch all sales data
// @route   GET /sales
// @access  Public

export const getSales = asyncHandler(async (req, res) => {
  try {
    const overallStats = await OverallStat.find();
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: "Sales data not found" });
  }
});
