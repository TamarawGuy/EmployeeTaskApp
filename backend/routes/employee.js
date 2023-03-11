const express = require("express");

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  mostTasksDone,
} = require("../controllers/employeeControllers");

const router = express.Router();

router.get("/", getEmployees);
router.get("/most-tasks-done", mostTasksDone);
router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
