import { useEffect, useState } from "react";

import EmployeeDetails from "../components/EmployeeDetails";
import TaskDetails from "../components/TaskDetails";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    requestEmployees();
    requestTasks();
  }, []);

  async function requestEmployees() {
    const res = await fetch("/api/employees");
    const json = await res.json();
    setEmployees(json);
  }

  async function requestTasks() {
    const res = await fetch("/api/tasks");
    const json = await res.json();
    setTasks(json);
  }

  return (
    <div className="home">
      <div className="employees-container">
        <h2>Employees</h2>
        {employees &&
          employees.map((emp) => (
            <EmployeeDetails
              key={emp._id}
              employee={emp}
              requestEmployees={requestEmployees}
              employees={employees}
              setEmployees={setEmployees}
              requestTasks={requestTasks}
            />
          ))}
      </div>
      <div className="tasks-container">
        <h2>Tasks</h2>
        {tasks &&
          tasks.map((task) => (
            <TaskDetails
              key={task._id}
              task={task}
              requestTasks={requestTasks}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
      </div>
    </div>
  );
}
