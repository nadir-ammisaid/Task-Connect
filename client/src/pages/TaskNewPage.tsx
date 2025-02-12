import { useNavigate } from "react-router-dom";

import TaskForm from "../components/TaskForm";

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
  );
}

export default TaskNew;
