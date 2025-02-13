import "./Footer.css";
import { NavLink } from "react-router-dom";
import homeIcon from "../../src/assets/images/home-7-128.png";
import myTasksIcon from "../../src/assets/images/list-2-128.png";
import postATaskIcon from "../../src/assets/images/plus-5-128.png";
import browseIcon from "../../src/assets/images/search-9-128.png";
import accountIcon from "../../src/assets/images/user-128.png";

function Footer() {
  return (
    <nav id="navbarLinksFooter">
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
  );
}

export default Footer;
