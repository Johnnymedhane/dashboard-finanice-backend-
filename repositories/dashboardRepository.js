import Transaction from "../models/transactions.js";
// Get dashboard data with optional date range filter
export async function getDashboardData(dateRange) {
  const pipeline = [];

  if (dateRange) {
    pipeline.push({
      $match: {
        date: { $gte: dateRange.start },
      },
    });
  }

  pipeline.push({
    $group: {
      _id: "$type",
      total: { $sum: "$amount" },
    },
  });

  return await Transaction.aggregate(pipeline);
}

