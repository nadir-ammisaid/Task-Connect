import { useEffect, useState } from "react";

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
        <div key={task.id}>
          <div className="card" key={task.id}>
            <h2 className="title-card">{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <div className="card-footer">
              <p className="name">{task.location}</p>
            </div>
            <div className="footer-card">
              <p>
                By {task.customer.user.firstname} {task.customer.user.lastname}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TaskCard;
