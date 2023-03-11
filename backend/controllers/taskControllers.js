const mongoose = require("mongoose");
const Task = require("../models/taskModel");

const getTasks = async (req, res) => {
  const tasks = await Task.find({}).populate("assignee");
  res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, assignee, dueDate } = req.body;

  let emptyFields = [];

  if (!title) emptyFields.push("Title");
  if (!description) emptyFields.push("Description");
  if (!assignee) emptyFields.push("Assignee");
  if (!dueDate) emptyFields.push("Due Date");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields:", emptyFields });
  }

  try {
    const task = await Task.create({ title, description, assignee, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignee, dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such task" });
  }

  let emptyFields = [];

  if (!title) emptyFields.push("Title");
  if (!description) emptyFields.push("Description");
  if (!assignee) emptyFields.push("Assignee");
  if (!dueDate) emptyFields.push("Due date");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all fields: ",
      emptyFields,
    });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      assignee,
      dueDate,
    }
  );

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such task" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
