import "./NotificationPage.css";
import notificationIcon from "../../src/assets/images/bell_icon.png";

function NotificationPage() {
  return (
    <main id="notificationPageContainer">
      <h1>Notifications</h1>
      <section className="notification-content">
        <img
          src={notificationIcon}
          alt="notification-icon"
          className="notification-icon"
        />
        <p className="no-notification-text">No new notifications</p>
      </section>
    </main>
  );
}

export default NotificationPage;
