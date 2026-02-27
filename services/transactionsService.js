
import * as transactionRepository from "../repositories/transactionsRepository.js";
import { endOfDay, startOfDay, parseISO, isValid } from "date-fns";

// Get all transactions
export async function fetchTransactions(query = {}, userId) {
    const { from, to, page = 1, limit = 10, type } = query;
    const filter = { deletedAt: null };

    if (userId) {
        filter.user = userId;
    }

    if (type) {
        filter.type = type;
    }
    if (from && to) {
        const fromDate = parseISO(String(from));
        const toDate = parseISO(String(to));

        if (isValid(fromDate) && isValid(toDate)) {
            const fromBound = String(from).includes("T") ? fromDate : startOfDay(fromDate);
            const toBound = String(to).includes("T") ? toDate : endOfDay(toDate);
            filter.date = { $gte: fromBound, $lte: toBound };
        }
    }
    

    const transactions = await transactionRepository.getTransactions(filter, page, limit);
    return transactions ;
 
};

// Create a new transaction
export async function createTransaction(data, userId) {
    // if(!data) throw new Error("Transaction data is required");
    data.user = userId;
    const transaction = await transactionRepository.createTransaction(data);
    return transaction;
};

// Get a transaction by ID
export async function getTransactionById(id, userId) {
    const transaction = await transactionRepository.getTransactionById(id, userId);
    return transaction;
}
// Update a transaction by ID
export async function updateTransaction(id, data, userId) {
    const transaction = await transactionRepository.updateTransaction(id, data, userId);
    return transaction;
}
// Soft delete a transaction by ID
export async function deleteTransaction(id, userId) {
    const transaction = await transactionRepository.softDeleteTransaction(id, userId);
    return transaction;
}
