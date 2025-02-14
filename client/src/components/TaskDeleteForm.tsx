import "./TaskForm.css";

// Interface defining the required props for the TaskDeleteForm component
interface TaskDeleteFormProps {
  onConfirm: () => void; // Function to handle delete confirmation
  onCancel: () => void; // Function to handle delete cancellation
}

function TaskDeleteForm({ onConfirm, onCancel }: TaskDeleteFormProps) {
  return (
    <div className="delete-form-overlay">
      <div className="delete-form-content">
        <p className="delete-warning">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="delete-form-buttons">
          <button type="button" className="delete-button" onClick={onConfirm}>
            Delete Task
          </button>
          <button type="button" className="cancel-delete" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDeleteForm;
