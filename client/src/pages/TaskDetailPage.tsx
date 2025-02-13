import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import locationIcon from "../../src/assets/images/location-80-128.png";
import timeIcon from "../../src/assets/images/tear-of-calendar-128.png";
import userAvatar from "../../src/assets/images/user-128-2.png";
import "./TaskDetailPage.css";

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

  const [task, setTask] = useState(null as null | Task);

  // const taskId = Number(id);

  useEffect(() => {
    // fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task?.id}`)
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
      // fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
      })
      .catch((error) => console.error("Error while fetching :", error));
    // }, [task?.id]);
  }, [id]);

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

                {task.image ? (
                  <div className="image-container">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${task.image}`}
                      alt="task"
                      className="task-image"
                    />
                  </div>
                ) : (
                  <div className="no-image-container">
                    <p className="no-image-message">No image</p>
                  </div>
                )}

                <div className="offers-section">
                  <div className="offer-item">
                    <div className="offer-user">
                      <img
                        src={userAvatar}
                        alt="user"
                        className="avatar-icon-detail-tasker"
                      />
                      <span>Jessica.J ⭐4,8(24)</span>
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
