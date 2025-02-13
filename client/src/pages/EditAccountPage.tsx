import { useState } from "react";
import userAvatar from "../../src/assets/images/user-128-2.png";
import "./EditAccountPage.css";
import { Link } from "react-router-dom";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  average_rating: number;
  total_reviews: number;
}

function EditAccountPage() {
  const [user] = useState<User>({
    firstname: "Nadir",
    lastname: "AMMI SAID",
    email: "ammi.said.nadir@gmail.com",
    role: "Customer",
    average_rating: 4.6,
    total_reviews: 27,
  });

  return (
    <main id="editAccountPageContainer">
      <div className="content-container">
        <h1>Edit my profile</h1>

        <div className="profile-header-edit">
          <div className="user-info-edit">
            <h2>
              {user.firstname} {user.lastname}
            </h2>
            <div className="rating">
              ⭐ {user.average_rating} ({user.total_reviews})
            </div>
          </div>
          <img src={userAvatar} alt="Profile" className="profile-avatar-edit" />
        </div>

        <form className="edit-profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.firstname}
            />
          </div>

          <div className="form-group">
            <label htmlFor="familyName">Family name</label>
            <input
              type="text"
              id="familyName"
              name="familyName"
              defaultValue={user.lastname}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••••••••"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirme your password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••••••••"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              defaultValue={user.role}
              disabled
            />
          </div>
          <Link to="/account">
            <div>
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
          </Link>
        </form>
      </div>
    </main>
  );
}

export default EditAccountPage;
