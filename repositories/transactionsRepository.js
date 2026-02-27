import Transaction from "../models/transactions.js";

// Create a new transaction
export async function createTransaction(data) {
  return await Transaction.create(data);
}

// Get all transactions
export async function getTransactions(filter, page, limit) {
  const skip = (page - 1) * limit;

  const totalTransactions = await Transaction.countDocuments(filter);

  const transactions = await Transaction.find(filter)
    .skip(skip)
    .sort({ date: -1 })
    .limit(limit);
  return { count: totalTransactions, transactions };
}

// Get a transaction by ID
export async function getTransactionById(id, userId) {
  const filter = { _id: id, deletedAt: null };
  if (userId) {
    filter.user = userId;
  }
  return await Transaction.findOne(filter);
  // return await Transaction.findOne({ _id: id, user: userId, deletedAt: null });
}
// Update a transaction by ID
export async function updateTransaction(id, data, userId) {
  const filter = { _id: id, deletedAt: null };
  if (userId) {
    filter.user = userId;
  }
  return await Transaction.findOneAndUpdate(filter, data, { new: true });
  // return await Transaction.findOneAndUpdate({ _id: id, user: userId, deletedAt: null }, data, { new: true });
}

// Delete a transaction by ID
export async function softDeleteTransaction(id, userId) {
  const filter = { _id: id, deletedAt: null };
  if (userId) {
    filter.user = userId;
  }
  return await Transaction.findOneAndUpdate(
    filter,
    { deletedAt: new Date() },
    { new: true },
  );
  // return await Transaction.findByIdAndUpdate(
  //  { _id: id, user: userId, deletedAt: null },
  //   { deletedAt: new Date() },
  //   { new: true },
  // );
}
