import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [monthlySalary, setMonthlySalary] = useState(null);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employee = { fullName, phoneNumber, dateOfBirth, monthlySalary };

    const response = await fetch("/api/employees", {
      method: "POST",
      body: JSON.stringify(employee),
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
      setFullName("");
      setPhoneNumber("");
      setDateOfBirth("");
      setMonthlySalary(null);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new employee</h2>

      {error && <div className="error">{error}</div>}

      <label>Full Name:</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      <button>Add Employee</button>
    </form>
  );
}
