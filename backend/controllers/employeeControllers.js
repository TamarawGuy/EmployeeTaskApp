const mongoose = require("mongoose");
const Employee = require("../models/employeeModel");
const Task = require("../models/taskModel");

const getEmployees = async (req, res) => {
  const employees = await Employee.find({});
  res.status(200).json(employees);
};

const createEmployee = async (req, res) => {
  const { fullName, email, phoneNumber, dateOfBirth, monthlySalary } = req.body;

  let emptyFields = [];

  if (!fullName) emptyFields.push("Full Name");
  if (!email) emptyFields.push("Email");
  if (!phoneNumber) emptyFields.push("Phone Number");
  if (!dateOfBirth) emptyFields.push("Date of Birth");
  if (!monthlySalary) emptyFields.push("Monthly Salary");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all fields: ",
      emptyFields,
    });
  }

  try {
    const employee = await Employee.create({
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      monthlySalary,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, phoneNumber, dateOfBirth, monthlySalary } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }

  let emptyFields = [];

  if (!fullName) emptyFields.push("Full Name");
  if (!email) emptyFields.push("Email");
  if (!phoneNumber) emptyFields.push("Phone Number");
  if (!dateOfBirth) emptyFields.push("Date of Birth");
  if (!monthlySalary) emptyFields.push("Monthly Salary");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all fields: ",
      emptyFields,
    });
  }

  const employee = await Employee.findOneAndUpdate(
    { _id: id },
    {
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      monthlySalary,
    },
    { new: true }
  );

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }

  res.status(200).json(employee);
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }

  const employee = await Employee.findOneAndDelete({ _id: id });

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }

  const tasks = await Task.deleteMany({ assignee: employee._id });

  res.status(200).json(employee);
};

const mostTasksDone = async (req, res) => {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  const employees = await Employee.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "assignee",
        as: "assignedTasks",
      },
    },
    {
      $addFields: {
        completedTasks: {
          $filter: {
            input: "$assignedTasks",
            as: "task",
            cond: {
              $and: [
                { $gte: ["$$task.dueDate", startDate] },
                { $lte: ["$$task.dueDate", new Date()] },
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        numCompletedTasks: {
          $size: "$completedTasks",
        },
      },
    },
    {
      $sort: { numCompletedTasks: -1 },
    },
    { $limit: 5 },
  ]);

  res.status(200).json(employees);
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  mostTasksDone,
};
