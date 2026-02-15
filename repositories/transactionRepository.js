



import Transaction from "../models/transactions.js";

// Get all transactions for a user
export async function getAllTransactions(userId) {
  return await Transaction.find({ user: userId });
}

// Get recent transactions (last N days) for a user
export async function getRecentTransactions(userId, recentDays) {
  return await Transaction.find({ user: userId, date: { $gte: recentDays } });
}

// Create a new transaction (data must include user)
export async function createTransaction(data) {
  return await Transaction.create(data);
}

// Get a transaction by ID for a user
export async function getTransactionById(userId, id) {
  return await Transaction.findOne({ _id: id, user: userId });
}

// Update a transaction by ID for a user
export async function updateTransaction(userId, id, data) {
  return await Transaction.findOneAndUpdate({ _id: id, user: userId }, data, {
    new: true,
    runValidators: true,
    context: "query",
  });
}

// Delete a transaction by ID for a user
export async function deleteTransaction(userId, id) {
  return await Transaction.findOneAndDelete({ _id: id, user: userId });
}


