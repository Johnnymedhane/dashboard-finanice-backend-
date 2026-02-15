import { subDays } from "date-fns";
import * as transactionRepository from "../repositories/transactionRepository.js";

// Get all transactions
export async function fetchTransactions(userId) {
  if (!userId) throw new Error("User ID is required");
  const transactions = await transactionRepository.getAllTransactions(userId);
  return transactions;
}

// Get recent transactions (last 7 days)
export async function fetchRecentTransactions(userId) {
  if (!userId) throw new Error("User ID is required");
  const recentDays = subDays(new Date(), 7);
  const transactions =
    await transactionRepository.getRecentTransactions(userId, recentDays);
  return transactions;
}

// Create a new transaction
export async function createTransaction(userId, data) {
  if (!userId) throw new Error("User ID is required");
  if (!data) throw new Error("Transaction data is required");
  const transaction = await transactionRepository.createTransaction({
    ...data,
    user: userId,
  });
  return transaction;
}

// Get a transaction by ID
export async function fetchTransactionById(userId, id) {
  if (!userId) throw new Error("User ID is required");
  if (!id) throw new Error("Transaction ID is required");
  const transaction = await transactionRepository.getTransactionById(userId, id);
  return transaction;
}

// Update a transaction by ID
export async function updateTransaction(userId, id, data) {
  if (!userId) throw new Error("User ID is required");
  if (!id) throw new Error("Transaction ID is required");
  if (!data) throw new Error("Transaction data is required");
  const transaction = await transactionRepository.updateTransaction(
    userId,
    id,
    data,
  );
  return transaction;
}

// Delete a transaction by ID
export async function deleteTransaction(userId, id) {
  if (!userId) throw new Error("User ID is required");
  if (!id) throw new Error("Transaction ID is required");
  const transaction = await transactionRepository.deleteTransaction(userId, id);
  return transaction;
}
