import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import "./TaskNewPage.css";

interface TaskFormData {
  title: string;
  description: string;
  location: string;
  image: File | null;
  category_id: number;
}

function TaskNew() {
  const navigate = useNavigate();

  const newTask = {
    title: "",
    description: "",
    location: "",
    image: null,
    category_id: 0,
  };

  return (
    <section>
      <h1 id="newTaskTitle">Post a new task</h1>
      <TaskForm
        defaultValue={newTask}
        onSubmit={(taskData: TaskFormData) => {
          const formData = new FormData();
          formData.append("title", taskData.title);
          formData.append("description", taskData.description);
          formData.append("location", taskData.location);
          formData.append("category_id", taskData.category_id.toString());
          if (taskData.image) {
            formData.append("image", taskData.image);
          }

          fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
            method: "post",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              navigate(`/browse/${data.insertId}`);
            })
            .catch((error) => console.error("Error:", error));
        }}
      >
        Submit
      </TaskForm>
    </section>
  );
}

export default TaskNew;
