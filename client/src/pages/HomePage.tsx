import { Link } from "react-router-dom";
// import logoDesktop from "../../public/logoDesktop.png";
// import logoMobile from "../../public/logoMobile.png";
// import bell_icon from "../../src/assets/images/bell_icon.png";
import mainImage from "../../public/mainImage.jpg";
import plusButton from "../../src/assets/images/Plus_square_button.png";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <section id="mainPageContainer">
        {/* <header id="header-landing">
          <div id="logos">
            <img src={logoMobile} alt="logo" id="logoImageMobileLanding" />
            <img src={logoDesktop} alt="logo" id="logoImageDesktop" />
          </div>
          <img src={bell_icon} alt="bell-icon" id="bell-icon" />
        </header> */}
        <section id="mainsectionpage">
          <div id="carousel">
            <img src={mainImage} alt="workers-illustration" id="mainImage" />
          </div>
          <div id="textSection">
            <h1 id="carousel-heading-text">
              Post a new tasks and find the best tasker in your area
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
