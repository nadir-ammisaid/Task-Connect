import { useEffect, useState } from "react";
import "./TaskCard.css";
import { Link } from "react-router-dom";
import locationIcon from "../../src/assets/images/location-80-128.png";
import timeIcon from "../../src/assets/images/tear-of-calendar-128.png";

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
    <section className="cards-container">
      {tasks.map((task) => (
        <Link to={`/browse/${task.id}`} key={task.id} className="card-link">
          <article className="card" key={task.id}>
            <header id="titleAndCategory">
              <h2 className="title-card">{task.title}</h2>
              <p className="category" data-type={task.category_name}>
                {task.category_name}
              </p>
            </header>
            <section id="time-info">
              <img src={timeIcon} alt="time-icon" className="taskCardIcons" />
              <p>Tomorrow, 11:00 - 13:00 (2h)</p>
            </section>
            <section id="location">
              <img
                src={locationIcon}
                alt="location-icon"
                className="taskCardIcons"
              />
              <p className="location-info">{task.location}</p>
            </section>
            <footer className="footer-card">
              <p>
                Posted by {task.customer.user.firstname}{" "}
                {task.customer.user.lastname}
              </p>
            </footer>
          </article>
        </Link>
      ))}
    </section>
  );
}

export default TaskCard;
