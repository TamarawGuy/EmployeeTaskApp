import { useState } from "react";

export default function EmployeeDetails({ employee, requestEmployees }) {
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState(employee.fullName);
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState(employee.dateOfBirth);
  const [monthlySalary, setMonthlySalary] = useState(employee.monthlySalary);

  const [error, setError] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();

    const newEmployee = { fullName, phoneNumber, dateOfBirth, monthlySalary };

    const response = await fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      body: JSON.stringify(newEmployee),
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

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/employees/${employee._id}`, {
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
      requestEmployees();
    }
  };

  return (
    <div className="employee-details">
      <p>
        <strong>Name: </strong>
        {employee.fullName}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {employee.phoneNumber}
      </p>
      <p>
        <strong>Date of Birth: </strong>
        {new Date(employee.dateOfBirth).toLocaleDateString()}
      </p>
      <p>
        <strong>Monthly Salary: </strong>
        {employee.monthlySalary}
      </p>
      <div className="btns">
        <button onClick={(e) => setShowForm(!showForm)}>Edit</button>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
      {showForm && (
        <form onSubmit={handleEdit}>
          <h2>Edit employee</h2>

          {error && <div className="error">{error}</div>}

          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <label>Monthly Salary:</label>
          <input
            type="number"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
          />

          <button>Edit Employee</button>
        </form>
      )}
    </div>
  );
}
