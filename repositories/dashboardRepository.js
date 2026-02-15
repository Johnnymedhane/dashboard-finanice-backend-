import Transaction from "../models/transactions.js";
// Get dashboard data with optional date range filter
export async function getDashboardData(dateRange, userId) {
 
  return await Transaction.aggregate([
    {
      $match: {
        date: { $gte: dateRange },
        user: userId,
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);
}

