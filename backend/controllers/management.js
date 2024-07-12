import mongoose from "mongoose";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";

export const getAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: "Admins not found" });
  }
});

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch user with affiliate stats
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    if (!userWithStats || userWithStats.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve sale transactions associated with affiliate sales
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    // Filter out null transactions
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    // Return user performance data
    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle internal server error
  }
};
