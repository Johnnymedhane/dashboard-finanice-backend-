const taskSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    progress: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;