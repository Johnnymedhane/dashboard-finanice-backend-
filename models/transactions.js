import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true
      // commented out required to allow for testing without authentication
    },
 
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be a positive number"]
    },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["completed", "pending"],
      default: "completed"
    },
    date: {
      type: Date,
      default: Date.now
    },
  deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
transactionSchema.index({  date: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ category: 1 });
transactionSchema.index({ user: 1 });
transactionSchema.index({ status: 1 });


transactionSchema.pre(/^find/, function (next) {
    this.where({ deletedAt: null });
    next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;