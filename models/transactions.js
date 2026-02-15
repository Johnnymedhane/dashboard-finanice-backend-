import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      trim: true,
      lowercase: true
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "amount must be a positive number"]
    },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "completed",
      trim: true,
      lowercase: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;