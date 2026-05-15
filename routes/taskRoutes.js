import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// GET
router.get("/", authMiddleware, getTasks);

// POST
router.post("/", authMiddleware, createTask);

// PUT
router.put("/:id", authMiddleware, updateTask);

// DELETE
router.delete("/:id", authMiddleware, deleteTask);

export default router;