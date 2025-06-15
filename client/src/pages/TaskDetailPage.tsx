import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Added useNavigate
import defaultTaskImage from "../../src/assets/images/default-task.avif";
import locationIcon from "../../src/assets/images/location-80-128.png";
import timeIcon from "../../src/assets/images/tear-of-calendar-128.png";
import userAvatar from "../../src/assets/images/user-128-2.png";
import "./TaskDetailPage.css";
import TaskDeleteForm from "../components/TaskDeleteForm"; // Added import

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

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Added navigate hook
  const [task, setTask] = useState(null as null | Task);
  const [showDeleteForm, setShowDeleteForm] = useState(false); // Added state for delete form

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
      })
      .catch((error) => console.error("Error while fetching :", error));
  }, [id]);

  // Added function to handle task deletion
  const handleDeleteTask = () => {
    if (!task) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/browse"); // Redirect to task list after successful deletion
        } else {
          throw new Error("Failed to delete task");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {task && (
        <div>
          <main id="mainDetailPage">
            <div className="content-container">
              <main id="mainDetailPage">
                <div className="status-badge">{task.status}</div>
                <h1 className="titleDetailPage">{task.title}</h1>

                <div className="info-row">
                  <img
                    src={userAvatar}
                    alt="user avatar"
                    className="avatar-icon-detail"
                  />
                  <div className="poster-info">
                    Posted by
                    <br />
                    {task.customer.user.firstname} {task.customer.user.lastname}
                  </div>
                </div>

                <div className="info-row">
                  <img src={timeIcon} alt="time" className="time-icon-detail" />
                  <span>Tomorrow, 11:00 — 13:00 (2h)</span>
                </div>

                <div className="info-row">
                  <img
                    src={locationIcon}
                    alt="location"
                    className="location-icon-detail"
                  />
                  <span>{task.location}</span>
                </div>

                <div className="description-section">
                  <h2>Task description</h2>
                  <p>{task.description}</p>
                </div>

                <div className="image-container">
                  <img
                    src={
                      task.image
                        ? `${import.meta.env.VITE_API_URL}/${task.image}`
                        : defaultTaskImage
                    }
                    alt={task.image ? "task" : "default task image"}
                    className="task-image"
                  />
                </div>

                <div className="button-container">
                  <Link to={`/browse/${task.id}/edit`} className="edit-my-task">
                    Edit my task
                  </Link>
                  <button
                    type="button"
                    className="delete-my-task"
                    onClick={() => setShowDeleteForm(true)}
                  >
                    Delete my task
                  </button>
                </div>

                {showDeleteForm && (
                  <TaskDeleteForm
                    onConfirm={handleDeleteTask}
                    onCancel={() => setShowDeleteForm(false)}
                  />
                )}

                <div className="offers-section">
                  <div className="offer-item">
                    <div className="offer-user">
                      <img
                        src={userAvatar}
                        alt="user"
                        className="avatar-icon-detail-tasker"
                      />
                      <span>Aboubaker.A ⭐4,8(24)</span>
                    </div>
                    <span className="offer-price">160,00 €</span>
                  </div>
                  <div className="offer-item">
                    <div className="offer-user">
                      <img
                        src={userAvatar}
                        alt="user"
                        className="avatar-icon-detail-tasker"
                      />
                      <span>David.K ⭐3,9(8)</span>
                    </div>
                    <span className="offer-price">99,00 €</span>
                  </div>
                  <div className="offer-item">
                    <div className="offer-user">
                      <img
                        src={userAvatar}
                        alt="user"
                        className="avatar-icon-detail-tasker"
                      />
                      <span>Matthieu.L ⭐5,0(1)</span>
                    </div>
                    <span className="offer-price">120,00 €</span>
                  </div>
                </div>
                <div className="button-container">
                  <button type="button" className="make-offer-button">
                    Make an offer
                  </button>
                </div>
              </main>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default TaskDetailPage;
