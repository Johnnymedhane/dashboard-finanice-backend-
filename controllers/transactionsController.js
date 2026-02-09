import * as transactionService from "../services/transactionsService.js";


export async function getTransactionsController(req, res) {
  try {
    const transactions = await transactionService.fetchTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
}

export async function createTransactionController(req, res) {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json(transaction);
  }
  catch (error) {
    console.error("Error creating transaction:", error);
    res.status(400).json({ message: "Failed to create transaction", error: error.message });
  }
}