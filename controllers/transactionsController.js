import * as transactionService from "../services/transactionsService.js";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateTransactionPayload(payload, { requireTypeAndAmount }) {
  if (!isPlainObject(payload)) {
    return { message: "Validation error", error: "JSON body is required" };
  }

  const fields = [];
  const errors = [];

  const hasType = Object.prototype.hasOwnProperty.call(payload, "type");
  const hasAmount = Object.prototype.hasOwnProperty.call(payload, "amount");
  const hasDescription = Object.prototype.hasOwnProperty.call(
    payload,
    "description",
  );
  const hasCategory = Object.prototype.hasOwnProperty.call(payload, "category");
  const hasStatus = Object.prototype.hasOwnProperty.call(payload, "status");
  const hasDate = Object.prototype.hasOwnProperty.call(payload, "date");

  if (requireTypeAndAmount || hasType) {
    if (payload.type !== "income" && payload.type !== "expense") {
      fields.push("type");
      errors.push('type must be either "income" or "expense"');
    }
  }

  if (requireTypeAndAmount || hasAmount) {
    if (!Number.isFinite(payload.amount) || payload.amount <= 0) {
      fields.push("amount");
      errors.push("amount must be a positive number");
    }
  }

  if (hasDescription) {
    if (
      typeof payload.description !== "string" ||
      payload.description.trim().length === 0
    ) {
      fields.push("description");
      errors.push("description must be a non-empty string");
    }
  }

  if (hasCategory) {
    if (
      typeof payload.category !== "string" ||
      payload.category.trim().length === 0
    ) {
      fields.push("category");
      errors.push("category must be a non-empty string");
    }
  }

  if (hasStatus) {
    if (payload.status !== "completed" && payload.status !== "pending") {
      fields.push("status");
      errors.push('status must be either "completed" or "pending"');
    }
  }

  if (hasDate) {
    const dateValue = payload.date;
    const isValidDate =
      dateValue instanceof Date
        ? !Number.isNaN(dateValue.getTime())
        : (typeof dateValue === "string" || typeof dateValue === "number") &&
          !Number.isNaN(new Date(dateValue).getTime());

    if (!isValidDate) {
      fields.push("date");
      errors.push("date must be a valid date");
    }
  }

  if (errors.length > 0) {
    return { message: "Validation error", fields, error: errors.join("; ") };
  }

  return null;
}

// Get all transactions
export async function getTransactionsController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await transactionService.fetchTransactions(userId);
    if (transactions.length === 0) {
      return res.status(200).json({ message: "No transactions yet. Start by creating a new transaction.", transactions: [] });
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
}

// Get recent transactions (last 7 days)
export async function getRecentTransactionsController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await transactionService.fetchRecentTransactions(userId);
    if (transactions.length === 0) {
      return res.status(200).json({ message: "No transactions in the last 7 days.", transactions: [] });
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    res.status(500).json({ message: "Failed to fetch recent transactions" });
  }
}

// Get a transaction by ID
export async function getTransactionByIdController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transaction = await transactionService.fetchTransactionById(
      userId,
      req.params.id,
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    if (error?.name === "CastError") {
      return res
        .status(400)
        .json({ message: `Invalid transaction id ${req.params.id}` });
    }
    console.error("Error fetching transaction by ID:", error);
    res.status(500).json({ message: "Failed to fetch transaction by ID" });
  }
}

// Create a new transaction
export async function createTransactionController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const validationError = validateTransactionPayload(req.body, {
      requireTypeAndAmount: true,
    });
    if (validationError) {
      return res.status(400).json(validationError);
    }

    if (Object.prototype.hasOwnProperty.call(req.body, "user")) {
      delete req.body.user;
    }

    if (typeof req.body.description === "string") {
      req.body.description = req.body.description.trim();
    }
    if (typeof req.body.category === "string") {
      req.body.category = req.body.category.trim();
    }

    const transaction = await transactionService.createTransaction(userId, req.body);
    res.status(201).json(transaction);
  } catch (error) {
    if (error?.name === "ValidationError") {
      const fields = Object.keys(error.errors || {});
      return res
        .status(400)
        .json({ message: "Validation error", fields, error: error.message });
    }
    console.error("Error creating transaction:", error);
    res
      .status(500)
      .json({ message: "Failed to create transaction", error: error.message });
  }
}

// Update a transaction by ID
export async function updateTransactionController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const validationError = validateTransactionPayload(req.body, {
      requireTypeAndAmount: false,
    });
    if (validationError) {
      return res.status(400).json(validationError);
    }

    if (Object.prototype.hasOwnProperty.call(req.body, "user")) {
      delete req.body.user;
    }

    if (typeof req.body.description === "string") {
      req.body.description = req.body.description.trim();
    }
    if (typeof req.body.category === "string") {
      req.body.category = req.body.category.trim();
    }

    const transaction = await transactionService.updateTransaction(
      userId,
      req.params.id,
      req.body,
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    if (error?.name === "CastError") {
      return res
        .status(400)
        .json({ message: `Invalid transaction id ${req.params.id}` });
    }
    if (error?.name === "ValidationError") {
      const fields = Object.keys(error.errors || {});
      return res
        .status(400)
        .json({ message: "Validation error", fields, error: error.message });
    }
    console.error("Error updating transaction:", error);
    res
      .status(500)
      .json({ message: "Failed to update transaction", error: error.message });
  }
}

// Delete a transaction by ID
export async function deleteTransactionController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transaction = await transactionService.deleteTransaction(
      userId,
      req.params.id,
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Deleted", id: transaction._id });
  } catch (error) {
    if (error?.name === "CastError") {
      return res
        .status(400)
        .json({ message: "Validation error", error: "Invalid transaction id" });
    }
    console.error("Error deleting transaction:", error);
    res
      .status(500)
      .json({ message: "Failed to delete transaction", error: error.message });
  }
}
