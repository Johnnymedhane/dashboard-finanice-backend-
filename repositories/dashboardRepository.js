import Transaction from "../models/transactions.js";

export async function getTotalBalance(dateRange) {
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
