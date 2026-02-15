import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [120, "Title is too long"],
    },
    completed: { type: Boolean, default: false },
    progress: { type: Number, min: 0, max: 100, default: 0 },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;