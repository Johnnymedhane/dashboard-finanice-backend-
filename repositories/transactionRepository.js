



import Transaction from "../models/transactions.js";


// Create a new transaction
export async function createTransaction(data) {
  const transaction = new Transaction(data);
  return await transaction.save();
}

// Get all transactions
export async function getTransactions() {
  return await Transaction.find();
};

// Get a transaction by ID
export async function getTransactionById(id) {
  return await Transaction.findById(id);
};
// Update a transaction by ID
export async function updateTransaction(id, data) {
  return await Transaction.findByIdAndUpdate(id, data, { new: true });
};

// Delete a transaction by ID
export async function deleteTransaction(id) {
  return await Transaction.findByIdAndDelete(id);
};


