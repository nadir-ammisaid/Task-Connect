import { useEffect, useState } from "react";
import "./TaskCard.css";

interface User {
  firstname: string;
  lastname: string;
}

interface Customer {
  id: number;
  user: User;
}

interface Task {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  status: string;
  selected_offer: number | null;
  category_id: string;
  category_name: string;
  customer: Customer;
}

function TaskCard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);

  return (
    <>
      {tasks.map((task) => (
        <div className="card" key={task.id}>
          <h2 className="title-card">{task.title}</h2>
          <p className="category">{task.category_name}</p>
          <div className="time-info">
            <p>Tomorrow, 11:00 — 13:00 (2h)</p>
          </div>
          <div className="card-footer">
            <p className="location-info">{task.location}</p>
          </div>
          <div className="footer-card">
            <p>
              By {task.customer.user.firstname} {task.customer.user.lastname}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default TaskCard;
