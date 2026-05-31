import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipes, deleteRecipe, getCategories } from "../services/api";
import { isLoggedIn, getUserRole } from "../services/auth";
import "../styles/AdminPage.css";

function AdminPage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Only admins can access this page
    if (!isLoggedIn() || getUserRole() !== "Admin") {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const [recipesData, categoriesData] = await Promise.all([
          getRecipes(),
          getCategories(),
        ]);
        setRecipes(recipesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    const res = await deleteRecipe(id);
    if (res.ok) {
      setRecipes(recipes.filter((r) => r.id !== id));
      setMessage("Recipe deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <div className="loading">Loading admin panel... 🔧</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🔑 Admin Panel</h1>
        <p>Manage all recipes and content</p>
      </div>

      {message && <p className="success-msg">{message}</p>}

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-number">{recipes.length}</div>
          <div className="stat-label">Total Recipes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{categories.length}</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      {/* Recipes Table */}
      <div className="admin-section">
        <h2>All Recipes</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.title}</td>
                  <td>
                    <span className="category-badge">
                      {recipe.categoryName}
                    </span>
                  </td>
                  <td>{recipe.authorUsername}</td>
                  <td>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{ fontSize: "13px", padding: "6px 12px" }}
                      onClick={() => handleDeleteRecipe(recipe.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Categories */}
      <div className="admin-section">
        <h2>Categories</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <span>{cat.name}</span>
              <small>{cat.description}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
