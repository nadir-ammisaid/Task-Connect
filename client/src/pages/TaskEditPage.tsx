import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TaskForm from "../components/TaskForm";

type Task = {
  id: number;
  title: string;
  description: string;
  location: string;
  image: File | null;
  category_id: number;
};

function TaskEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [task, setTask] = useState(null as null | Task);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
      .then((response) => response.json())
      .then((data: Task) => {
        setTask(data);
      })
      .catch((error) => console.error("Error loading task:", error));
  }, [id]);

  return (
    task && (
      <TaskForm
        defaultValue={task}
        onSubmit={(taskData) => {
          const updatedTask = {
            title: taskData.title,
            description: taskData.description,
            location: taskData.location,
            category_id: taskData.category_id,
          };

          fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
          })
            .then((response) => {
              if (response.status === 204) {
                navigate(`/browse/${task.id}`);
              } else {
                console.error("Error updating task");
              }
            })
            .catch((error) => console.error("Error:", error));
        }}
      >
        Edit
      </TaskForm>
    )
  );
}

export default TaskEdit;
