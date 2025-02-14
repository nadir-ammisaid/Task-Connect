import type { ReactNode } from "react";
import "./TaskForm.css";

interface TaskDeleteFormProps {
  children: ReactNode;
  onSubmit: () => void;
}

function TaskDeleteForm({ children, onSubmit }: TaskDeleteFormProps) {
  return (
    <form
      id="taskform"
      className="delete-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <p className="delete-warning">
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <button type="submit" className="delete-button">
        {children}
      </button>
    </form>
  );
}

export default TaskDeleteForm;
