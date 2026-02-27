import * as transactionService from "../services/transactionsService.js";


export async function getTransactionsController(req, res) {
  try {
    const userId = req.user?.id;
    const transactions = await transactionService.fetchTransactions(req.query, userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
}

export async function createTransactionController(req, res) {
  try {
    const userId = req.user?.id;
    const transaction = await transactionService.createTransaction(req.body, userId);
    res.status(201).json(transaction);
  }
  catch (error) {
    console.error("Error creating transaction:", error);
    res.status(400).json({ message: "Failed to create transaction", error: error.message });
  }
}

export async function getTransactionByIdController(req, res) {
  try {
    const userId = req.user?.id;
    const transaction = await transactionService.getTransactionById(req.params.id, userId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ message: "Failed to fetch transaction" });
  }
}

export async function updateTransactionController(req, res) {
  try {
    const userId = req.user?.id;
    const transaction = await transactionService.updateTransaction(req.params.id, req.body, userId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Failed to update transaction" });
  }
}

export async function deleteTransactionController(req, res) {
  try {
    const userId = req.user?.id;
    const transaction = await transactionService.deleteTransaction(req.params.id, userId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
}

