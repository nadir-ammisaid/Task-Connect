import { Link } from "react-router-dom";
import mainImageHome from "../../public/mainImageHome.jpg";
import plusButton from "../../src/assets/images/Plus_square_button.png";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <section id="mainPageContainer">
        <section id="mainsectionpage">
          <div id="carousel">
            <img
              src={mainImageHome}
              alt="workers-illustration"
              id="mainImageHome"
            />
          </div>
          <div id="textSection">
            <h1 id="carousel-heading-text">
              Post a new task and find the best tasker in your area
            </h1>
          </div>
          <Link to="/post-a-new-task">
            <img src={plusButton} alt="plusButton" id="plusButton" />
          </Link>
        </section>
      </section>
    </>
  );
}

export default HomePage;
