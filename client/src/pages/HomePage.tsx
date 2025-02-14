import { Link } from "react-router-dom";
import mainImageHome from "../../public/mainImageHome.jpg";
import plusButton from "../../src/assets/images/Plus_square_button.png";
import "./HomePage.css";

function HomePage() {
  const features = [
    {
      title: "Fast & Reliable",
      description: "Find skilled taskers within hours",
      icon: "⚡",
    },
    {
      title: "Secure Payment",
      description: "Pay only when the job is done",
      icon: "🔒",
    },
    {
      title: "Verified Taskers",
      description: "All taskers are background-checked",
      icon: "✓",
    },
  ];

  const categories = [
    { name: "DIY", count: "150+ tasks" },
    { name: "Gardening", count: "80+ tasks" },
    { name: "Moving", count: "200+ tasks" },
    { name: "Cleaning", count: "300+ tasks" },
  ];

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
            <p className="subtitle">
              Thousands of trusted taskers ready to help
            </p>
          </div>
          <Link to="/post-a-new-task">
            <img src={plusButton} alt="plusButton" id="plusButton" />
          </Link>

          <div className="features-section">
            {features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="categories-section">
            <h2>Popular Categories</h2>
            <div id="categoriesContainer">
              <div className="categories-grid">
                {categories.map((category) => (
                  <div className="category-card" key={category.name}>
                    <h3>{category.name}</h3>
                    <p>{category.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="trust-section">
            <h2>Why Choose Us</h2>
            <div className="stats">
              <div className="stat-item">
                <h3>10,000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat-item">
                <h3>95%</h3>
                <p>Satisfaction Rate</p>
              </div>
              <div className="stat-item">
                <h3>1,000+</h3>
                <p>Active Taskers</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default HomePage;
