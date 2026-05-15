import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    status: {
      type: String,
      default: "Pending",
    },

    priority: {
      type: String,
      default: "Low",
    },
    dueDate :{
      type : Date
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Task",
  taskSchema
);