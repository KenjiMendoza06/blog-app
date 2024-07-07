import mongoose from "mongoose";

const productStatSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      yearlySalesTotal: Number,
      yearlyTotalSoldUnits: Number,
      year: Number,
      monthlyData: [
        {
          month: String,
          totalSales: Number,
          totalSoldUnits: Number,
        },
      ],
      dailyData: {
        date: String,
        totalSales: Number,
        totalSoldUnits: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ProductStat = mongoose.model("ProductStat", productStatSchema);

export default ProductStat;
