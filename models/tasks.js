import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true 
      // commented out required to allow for testing without authentication
    },
   
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
  },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true },

);

taskSchema.index({ user: 1 });
taskSchema.index({ completed: 1 });
taskSchema.index({ progress: 1 });
taskSchema.index({ date: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
