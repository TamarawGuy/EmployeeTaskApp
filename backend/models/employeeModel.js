const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    fullName: String,
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: String,
    dateOfBirth: Date,
    monthlySalary: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
