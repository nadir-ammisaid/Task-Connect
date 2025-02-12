// import { Link, useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import "./BrowsePage.css";

function BrowsePage() {
  //   const { id } = useParams();
  return (
    <>
      <main id="BrowsePageContainer">
        {/* <Link to={"/post-a-new-task"}>
          <button id="button" type="button">
            Post a new task
          </button>
        </Link> */}
        <section id="tasksContainer">
          <h1>Tasks</h1>
          {/* <Link to={`/browse/${id}`} className="grid-card"> */}
          <TaskCard />
          {/* </Link> */}
        </section>
      </main>
    </>
  );
}

export default BrowsePage;
