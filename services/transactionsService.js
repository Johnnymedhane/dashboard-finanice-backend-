
import * as transactionRepository from "../repositories/transactionRepository.js";

// Get all transactions
export async function fetchTransactions() {
    const transactions = await transactionRepository.getTransactions();
    return transactions;
 
};

// Create a new transaction
export async function createTransaction(data) {
    if(!data) throw new Error("Transaction data is required");
    const transaction = await transactionRepository.createTransaction(data);
    return transaction;
};
