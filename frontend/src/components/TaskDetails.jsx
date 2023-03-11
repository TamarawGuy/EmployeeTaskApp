import { useEffect, useState } from "react";

export default function TaskDetails({ task, requestTasks }) {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignee, setAssignee] = useState(task.assignee);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const [error, setError] = useState(null);

  useEffect(() => {
    requestEmployees();
  }, []);

  async function requestEmployees() {
    const res = await fetch("/api/employees");
    const json = await res.json();
    setEmployees(json);
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      requestTasks();
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const newTask = { title, description, assignee, dueDate };

    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(`${json.error} ${json.emptyFields.join(", ")}`);
    }

    if (response.ok) {
      setShowForm(!showForm);
    }
  };

  return (
    <div className="task-details">
      <p>
        <strong>Title: </strong>
        {task.title}
      </p>
      <p>
        <strong>Description: </strong>
        {task.description}
      </p>
      <p>
        <strong>Assigned to: </strong>
        {task.assignee.fullName}
      </p>
      <p>
        <strong>DueDate: </strong>
        {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <div className="btns">
        <button onClick={(e) => setShowForm(!showForm)}>Edit</button>
        <button onClick={(e) => handleDelete(e)}>Delete Task</button>
      </div>

      {showForm && (
        <form onSubmit={handleEdit}>
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
          <button>Edit Task</button>
        </form>
      )}
    </div>
  );
}
