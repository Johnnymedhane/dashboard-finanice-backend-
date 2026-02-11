import { subDays } from "date-fns";
import * as transactionRepository from "../repositories/transactionRepository.js";

// Get all transactions
export async function fetchTransactions() {
  const transactions = await transactionRepository.getAllTransactions();
  return transactions;
}

// Get recent transactions (last 7 days)
export async function fetchRecentTransactions() {
  const recentDays = subDays(new Date(), 7);
  const transactions =
    await transactionRepository.getRecentTransactions(recentDays);
  return transactions;
}

// Create a new transaction
export async function createTransaction(data) {
  if (!data) throw new Error("Transaction data is required");
  const transaction = await transactionRepository.createTransaction(data);
  return transaction;
}

// Get a transaction by ID
export async function fetchTransactionById(id) {
  if (!id) throw new Error("Transaction ID is required");
  const transaction = await transactionRepository.getTransactionById(id);
  return transaction;
}

// Update a transaction by ID
export async function updateTransaction(id, data) {
  if (!id) throw new Error("Transaction ID is required");
  if (!data) throw new Error("Transaction data is required");
  const transaction = await transactionRepository.updateTransaction(id, data);
  return transaction;
}

// Delete a transaction by ID
export async function deleteTransaction(id) {
  if (!id) throw new Error("Transaction ID is required");
  const transaction = await transactionRepository.deleteTransaction(id);
  return transaction;
}
