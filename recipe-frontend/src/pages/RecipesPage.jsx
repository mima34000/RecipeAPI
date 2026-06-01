import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes, getCategories } from "../services/api";
import { isLoggedIn } from "../services/auth";
import "../styles/RecipesPage.css";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesData, categoriesData] = await Promise.all([
          getRecipes(),
          getCategories(),
        ]);
        setRecipes(recipesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to load recipes", err);
        setError("Could not load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = recipes.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "" || r.categoryName === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (loading) return <div className="loading">Loading recipes... 🍳</div>;

  return (
    <div className="recipes-page">
      <div className="recipes-header">
        <h1>All Recipes</h1>
        {loggedIn && (
          <Link to="/recipes/create" className="btn btn-primary">
            + Add Recipe
          </Link>
        )}
      </div>

      <div className="recipes-filters">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {filtered.length === 0 ? (
        <div className="no-recipes">
          <p>No recipes found. Try a different search! 🔍</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {filtered.map((recipe) => (
            <Link
              to={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="recipe-card"
            >
              <div className="recipe-card-emoji">🍽️</div>
              <div className="recipe-card-body">
                <span className="recipe-category">{recipe.categoryName}</span>
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-meta">
                  <span>
                    ⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                  </span>
                  <span>👤 {recipe.authorUsername}</span>
                  <span>🍴 {recipe.servings} servings</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipesPage;
