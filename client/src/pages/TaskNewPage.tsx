import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import "./TaskNewPage.css";

function TaskNew() {
  const navigate = useNavigate();

  const newTask = {
    title: "",
    description: "",
    location: "",
    image: "",
    category_id: 0,
  };

  return (
    <section>
      <h1 id="newTaskTitle">Post a new task</h1>
      <TaskForm
        defaultValue={newTask}
        onSubmit={(taskData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
          })
            .then((response) => response.json())
            .then((data) => {
              navigate(`/browse/${data.insertId}`);
            });
        }}
      >
        Submit
      </TaskForm>
    </section>
  );
}

export default TaskNew;
