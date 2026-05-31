import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFavorites, removeFromFavorites } from "../services/api";
import { isLoggedIn } from "../services/auth";
import "../styles/RecipesPage.css";

function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        console.error("Failed to load favorites", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [navigate]);

  const handleRemove = async (recipeId) => {
    const res = await removeFromFavorites(recipeId);
    if (res.ok) {
      setFavorites(favorites.filter((f) => f.id !== recipeId));
    }
  };

  if (loading) return <div className="loading">Loading favorites... ❤️</div>;

  return (
    <div className="recipes-page">
      <div className="recipes-header">
        <h1>My Favorites ❤️</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="no-recipes">
          <p>You have no favorite recipes yet!</p>
          <Link
            to="/recipes"
            className="btn btn-primary"
            style={{ marginTop: "16px", display: "inline-block" }}
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="recipes-grid">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}>
                <div className="recipe-card-emoji">🍽️</div>
                <div className="recipe-card-body">
                  <span className="recipe-category">{recipe.categoryName}</span>
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-meta">
                    <span>
                      ⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                    </span>
                    <span>🍴 {recipe.servings} servings</span>
                  </div>
                </div>
              </Link>
              <div style={{ padding: "0 20px 20px" }}>
                <button
                  className="btn btn-danger"
                  style={{ width: "100%", fontSize: "14px" }}
                  onClick={() => handleRemove(recipe.id)}
                >
                  ✕ Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
