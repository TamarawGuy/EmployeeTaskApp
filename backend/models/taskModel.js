const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  dueDate: Date,
});

module.exports = mongoose.model("Task", taskSchema);
