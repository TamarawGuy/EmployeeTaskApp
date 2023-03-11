import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const [employees, setEmployees] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    requestEmployees();
  }, []);

  async function requestEmployees() {
    const res = await fetch("/api/employees");
    const json = await res.json();
    setEmployees(json);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = { title, description, assignee, dueDate };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(`${json.error} ${json.emptyFields.join(", ")}`);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setDescription("");
      setAssignee("");
      setDueDate("");
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new task</h2>

      {error && <div className="error">{error}</div>}

      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="assignee">Assignee:</label>
      <select
        id="assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      >
        <option />
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.fullName}
          </option>
        ))}
      </select>

      <label htmlFor="dueDate">Due date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button>Create Task</button>
    </form>
  );
}
