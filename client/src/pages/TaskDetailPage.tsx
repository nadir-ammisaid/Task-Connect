import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          <main id="mainHome">
            {/* <Link to={"/post_request"}>
              <button id="button" type="button">
                Submit a request
              </button>
            </Link> */}
            <h1>Task detail page</h1>
            <section id="taskDetailsContainer">
              <p>{task.status}</p>
              <h1>{task.title}</h1>
              <p>
                Posted by {task.customer.user.firstname}{" "}
                {task.customer.user.lastname}
              </p>
              <p>{task.location}</p>
              <h2>Task description:</h2>
              <p>{task.description}</p>
              {task.image ? (
                <img src={task.image} alt="task_photo" id="task_photo" />
              ) : (
                <p>No image</p>
              )}
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default TaskDetailPage;
