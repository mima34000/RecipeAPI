import { Link } from "react-router-dom";
import { isLoggedIn } from "../services/auth";
import "../styles/HomePage.css";

function HomePage() {
  const loggedIn = isLoggedIn();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover & Share <span>Amazing Recipes</span>
          </h1>
          <p className="hero-subtitle">
            Find inspiration for your next meal, save your favorites, and share
            your own creations with the world.
          </p>
          <div className="hero-buttons">
            <Link to="/recipes" className="btn btn-primary">
              Browse Recipes
            </Link>
            {!loggedIn && (
              <Link to="/register" className="btn btn-secondary">
                Get Started
              </Link>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-emoji">🍳</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="features-title">Why RecipeApp?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Browse Recipes</h3>
            <p>
              Explore hundreds of recipes across all categories — breakfast,
              lunch, dinner and more.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Save Favorites</h3>
            <p>
              Create your personal collection by saving the recipes you love
              most.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Share Your Recipes</h3>
            <p>Create and share your own recipes with the community.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!loggedIn && (
        <section className="cta">
          <div className="cta-content">
            <h2>Ready to start cooking?</h2>
            <p>
              Join thousands of food lovers and start sharing your recipes
              today.
            </p>
            <Link to="/register" className="btn btn-primary">
              Create Free Account
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePage;
