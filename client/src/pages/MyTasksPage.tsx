import "./MyTasksPage.css";
import constructionIcon from "../../src/assets/images/construction-5.svg";

function MyTasksPage() {
  return (
    <main id="notificationPageContainer">
      <h1>Notifications</h1>
      <section className="notification-content">
        <img
          src={constructionIcon}
          alt="notification-icon"
          className="notification-icon"
        />
        <p className="no-notification-text">
          Under construction, come back later !
        </p>
      </section>
    </main>
  );
}

export default MyTasksPage;
