require("dotenv").config();

const express = require("express");
const employeeRoutes = require("./routes/employee");
const taskRoutes = require("./routes/task");
const mongoose = require("mongoose");

// express app
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to db and listening for requests on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
