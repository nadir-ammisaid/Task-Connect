import "./Header.css";
import { NavLink } from "react-router-dom";
import bell_icon from "../../src/assets/images/bell_icon.png";
import homeIcon from "../../src/assets/images/home-7-128.png";
import myTasksIcon from "../../src/assets/images/list-2-128.png";
import logoDesktop from "../../src/assets/images/logoDesktop.avif";
import logoMobile from "../../src/assets/images/logoMobile.avif";
import postATaskIcon from "../../src/assets/images/plus-5-128.png";
import browseIcon from "../../src/assets/images/search-9-128.png";
import accountIcon from "../../src/assets/images/user-128.png";

function Header() {
  return (
    <section id="headerContainer">
      <div id="logos">
        <NavLink to="/" className="footerLinks">
          <img src={logoMobile} alt="logo" id="logoImageMobile" />
          <img src={logoDesktop} alt="logo" id="logoImageDesktop" />
        </NavLink>
      </div>

      <nav id="navbarLinksContainer">
        <NavLink to="/" className="footerLinks">
          <img src={homeIcon} alt="home-icon" className="navbarIcons" />
          Home
        </NavLink>

        <NavLink to="/browse" className="footerLinks">
          <img src={browseIcon} alt="browse-icon" className="navbarIcons" />
          Browse
        </NavLink>

        <NavLink to="/post-a-new-task" className="footerLinks">
          <img
            src={postATaskIcon}
            alt="post-a-task-icon"
            className="navbarIcons"
          />
          Post a task
        </NavLink>

        <NavLink to="/my-tasks" className="footerLinks">
          <img src={myTasksIcon} alt="my-tasks-icon" className="navbarIcons" />
          My tasks
        </NavLink>

        <NavLink to="/account" className="footerLinks">
          <img src={accountIcon} alt="account-icon" className="navbarIcons" />
          Account
        </NavLink>
      </nav>

      <div id="bellContainer">
        <NavLink to="/notifications" className="footerLinks">
          <img src={bell_icon} alt="bell-icon" className="bellIcons" />
        </NavLink>
      </div>
    </section>
  );
}

export default Header;
