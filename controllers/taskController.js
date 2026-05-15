import Task from "../models/Task.js";

// ======================
// GET TASKS
// ======================
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// ======================
// CREATE TASK
// ======================
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title required" });
    }

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user.id,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// ======================
// UPDATE TASK
// ======================
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const { title, description, status, priority } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// ======================
// DELETE TASK
// ======================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await task.deleteOne();

    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};