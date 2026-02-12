



import Transaction from "../models/transactions.js";


// Get all transactions
export async function getAllTransactions() {
  return await Transaction.find();
};

// Get recent transactions (last 7 days)
export async function getRecentTransactions(recentDays) {
  
  return await Transaction.find({ date: { $gte: recentDays } });
}

// Create a new transaction
export async function createTransaction(data) {
  const transaction = new Transaction(data);
  return await transaction.save();
}

// Get a transaction by ID
export async function getTransactionById(id) {
  return await Transaction.findById(id);
};

// Update a transaction by ID
export async function updateTransaction(id, data) {
  return await Transaction.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    context: "query",
  });
};

// Delete a transaction by ID
export async function deleteTransaction(id) {
  return await Transaction.findByIdAndDelete(id);
};


