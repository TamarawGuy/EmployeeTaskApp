import { useEffect, useState } from "react";
import Winners from "../components/Winners";

export default function Rankings() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    requestWinners();
  }, []);

  async function requestWinners() {
    const res = await fetch("/api/employees/most-tasks-done");
    const json = await res.json();
    setEmployees(json);
  }
  return (
    <div className="winners-container">
      <h2>The 5 employees who completed the largest number of tasks</h2>
      <div>
        {employees &&
          employees.map((emp) => <Winners key={emp._id} winner={emp} />)}
      </div>
    </div>
  );
}
