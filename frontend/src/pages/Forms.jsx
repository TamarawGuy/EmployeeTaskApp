import EmployeeForm from "../components/EmployeeForm";
import TaskForm from "../components/TaskForm";

export default function Forms() {
  return (
    <div className="forms">
      <div className="employee-form">
        <EmployeeForm />
      </div>
      <div className="task-form">
        <TaskForm />
      </div>
    </div>
  );
}
