// import { Link, useParams } from "react-router-dom";
// import { Link, useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function BrowsePage() {
  //   const { id } = useParams();
  return (
    <>
      <div>
        <main id="mainHome">
          {/* <Link to={"/post_request"}>
              <button id="button" type="button">
                Submit a request
              </button>
            </Link> */}
          <section id="ongoing-requests">
            <h1>Tasks</h1>
            <div className="cards-container">
              {/* <Link to={`/browse/${id}`} className="grid-card"> */}
              <TaskCard />
              {/* </Link> */}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default BrowsePage;
