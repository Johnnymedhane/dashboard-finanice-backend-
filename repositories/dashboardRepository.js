import Task from "../models/tasks.js";
import Transaction from "../models/transactions.js";

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
export async function getPendingtasks(userId, dateRange) {
 return await Task.find(
  { completed: false,
    userId: userId,
    deletedAt: null,
    date: { $gte: dateRange }
  }
 ).countDocuments();
}
