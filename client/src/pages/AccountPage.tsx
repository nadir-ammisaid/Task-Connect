import { useEffect, useState } from "react";
import userAvatar from "../../src/assets/images/user-128-2.png";
import "./AccountPage.css";
import { Link } from "react-router-dom";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  average_rating: number;
  total_reviews: number;
}

function AccountPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulation de données pour le moment
    setUser({
      firstname: "Nadir",
      lastname: "AMMI SAID",
      email: "ammi.said.nadir@gmail.com",
      role: "Customer",
      average_rating: 4.6,
      total_reviews: 27,
    });
  }, []);

  return (
    <main id="accountPageContainer">
      <div className="content-container">
        <section className="profile-header">
          <h1>My profile</h1>
          <div className="user-info">
            <div className="user-main-info">
              <h2>
                {user?.firstname} {user?.lastname}
              </h2>
              <div className="rating">
                ⭐ {user?.average_rating} ({user?.total_reviews})
              </div>
            </div>
            <img src={userAvatar} alt="Profile" className="profile-avatar" />
          </div>
        </section>
        <Link to="/edit-account">
          <div className="button-container-account">
            <button type="button" className="edit-account">
              Edit my profile
            </button>
          </div>
        </Link>

        <section className="account-details">
          <div className="detail-item">
            <h3>Email address</h3>
            <p>{user?.email}</p>
          </div>

          <div className="detail-item">
            <h3>Role</h3>
            <p>{user?.role}</p>
          </div>
        </section>

        <section className="account-options">
          <button type="button" className="option-button">
            🌐 Change Language
          </button>
          <button type="button" className="option-button">
            🌙 Change Theme
          </button>
          <div className="divider" />
          <button type="button" className="option-button">
            ⚡ See How it works
          </button>
          <button type="button" className="option-button">
            ℹ️ Visit help center
          </button>
          <button type="button" className="option-button">
            🎧 Report an issue
          </button>
          <button type="button" className="option-button">
            ⭐ Give us feedback
          </button>
          <div className="divider" />
          <button type="button" className="option-button terms">
            Terms & Conditions
          </button>
          <button type="button" className="option-button terms">
            Privacy Policy
          </button>
          <div className="divider" />
          <button type="button" className="option-button logout">
            Logout
          </button>
          <button type="button" className="option-button delete">
            Delete my account
          </button>
        </section>
      </div>
    </main>
  );
}

export default AccountPage;
