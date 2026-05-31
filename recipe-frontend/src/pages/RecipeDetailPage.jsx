import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRecipeById, deleteRecipe, addToFavorites } from "../services/api";
import { isLoggedIn, getUserRole, getUserId } from "../services/auth";
import "../styles/RecipeDetailPage.css";

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loggedIn = isLoggedIn();
  const role = getUserRole();
  const userId = getUserId();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        console.error("Failed to load recipe", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    const res = await deleteRecipe(id);
    if (res.ok) {
      navigate("/recipes");
    }
  };

  const handleFavorite = async () => {
    const res = await addToFavorites(id);
    if (res.ok) {
      setMessage("Added to favorites! ❤️");
    } else {
      setMessage("Already in favorites!");
    }
  };

  if (loading) return <div className="loading">Loading recipe... 🍳</div>;
  if (!recipe) return <div className="loading">Recipe not found.</div>;

  const isOwner = userId === String(recipe.userId);
  const isAdmin = role === "Admin";

  return (
    <div className="recipe-detail-page">
      {/* Header */}
      <div className="recipe-detail-header">
        <div className="recipe-detail-emoji">🍽️</div>
        <div className="recipe-detail-info">
          <span className="recipe-category-badge">{recipe.categoryName}</span>
          <h1>{recipe.title}</h1>
          <p className="recipe-detail-meta">
            <span>⏱ Prep: {recipe.prepTimeMinutes} min</span>
            <span>🔥 Cook: {recipe.cookTimeMinutes} min</span>
            <span>🍴 Servings: {recipe.servings}</span>
            <span>👤 By: {recipe.authorUsername}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="recipe-actions">
        {loggedIn && (
          <button className="btn btn-primary" onClick={handleFavorite}>
            ❤️ Add to Favorites
          </button>
        )}
        {(isOwner || isAdmin) && (
          <Link to={`/recipes/${id}/edit`} className="btn btn-secondary">
            ✏️ Edit Recipe
          </Link>
        )}
        {(isOwner || isAdmin) && (
          <button className="btn btn-danger" onClick={handleDelete}>
            🗑️ Delete Recipe
          </button>
        )}
        {message && <span className="success-msg">{message}</span>}
      </div>

      {/* Description */}
      <div className="recipe-section">
        <h2>Description</h2>
        <p>{recipe.description}</p>
      </div>

      {/* Ingredients */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>
                <span className="ingredient-amount">
                  {ing.amount} {ing.unit}
                </span>
                <span>{ing.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients listed.</p>
        )}
      </div>

      {/* Instructions */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <p className="instructions-text">{recipe.instructions}</p>
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/recipes")}
      >
        ← Back to Recipes
      </button>
    </div>
  );
}

export default RecipeDetailPage;
