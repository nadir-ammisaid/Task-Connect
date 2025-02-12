import "./Header.css";
import { Link } from "react-router-dom";
import logoDesktop from "../../public/logoDesktop.png";
import logoMobile from "../../public/logoMobile.png";
import bell_icon from "../../src/assets/images/bell_icon.png";
import homeIcon from "../../src/assets/images/home-icon.png";
import myTasksIcon from "../../src/assets/images/list-2-128.png";
import postATaskIcon from "../../src/assets/images/plus-5-128.png";
import browseIcon from "../../src/assets/images/search-9-128.png";
import accountIcon from "../../src/assets/images/user-128.png";

function Header() {
  return (
    <section id="headerContainer">
      <div id="logos">
        <Link to="/" className="footerLinks">
          <img src={logoMobile} alt="logo" id="logoImageMobile" />
          <img src={logoDesktop} alt="logo" id="logoImageDesktop" />
        </Link>
      </div>

      <nav id="navbarLinks">
        <Link to="/" className="footerLinks">
          <img src={homeIcon} alt="home-icon" className="navbarIcons" />
          Home
        </Link>

        <Link to="/browse" className="footerLinks">
          <img src={browseIcon} alt="browse-icon" className="navbarIcons" />
          Browse
        </Link>

        <Link to="/post-a-new-task" className="footerLinks">
          <img
            src={postATaskIcon}
            alt="post-a-task-icon"
            className="navbarIcons"
          />
          Post a task
        </Link>

        <Link to="/my-tasks" className="footerLinks">
          <img src={myTasksIcon} alt="my-tasks-icon" className="navbarIcons" />
          My tasks
        </Link>
        <Link to="/account" className="footerLinks">
          <img src={accountIcon} alt="account-icon" className="navbarIcons" />
          Account
        </Link>
      </nav>

      <div id="bellContainer">
        <Link to="/notifications" className="footerLinks">
          <img src={bell_icon} alt="bell-icon" className="bellIcons" />
        </Link>
      </div>
    </section>
  );
}

export default Header;
