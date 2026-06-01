import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById, updateRecipe, getCategories } from "../services/api";
import { isLoggedIn } from "../services/auth";
import "../styles/CreateRecipePage.css";

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    categoryId: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const [recipe, cats] = await Promise.all([
          getRecipeById(id),
          getCategories(),
        ]);
        setCategories(cats);
        setFormData({
          title: recipe.title,
          description: recipe.description,
          instructions: recipe.instructions,
          prepTimeMinutes: recipe.prepTimeMinutes,
          cookTimeMinutes: recipe.cookTimeMinutes,
          servings: recipe.servings,
          categoryId:
            cats.find((c) => c.name === recipe.categoryName)?.id || "",
        });
      } catch (err) {
        console.error("Failed to load recipe", err);
        setError("Could not load recipe. Please try again.");
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        prepTimeMinutes: parseInt(formData.prepTimeMinutes),
        cookTimeMinutes: parseInt(formData.cookTimeMinutes),
        servings: parseInt(formData.servings),
        categoryId: parseInt(formData.categoryId),
      };

      const res = await updateRecipe(id, payload);
      if (res.ok) {
        navigate(`/recipes/${id}`);
      } else {
        const data = await res.text();
        setError(data || "Failed to update recipe.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-recipe-page">
      <h1>Edit Recipe ✏️</h1>
      <p className="create-subtitle">Update your recipe details.</p>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label>Recipe Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Time & Servings</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Prep Time (minutes)</label>
              <input
                type="number"
                name="prepTimeMinutes"
                value={formData.prepTimeMinutes}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Cook Time (minutes)</label>
              <input
                type="number"
                name="cookTimeMinutes"
                value={formData.cookTimeMinutes}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Servings</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Instructions</h2>
          <div className="form-group">
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
              rows={6}
            />
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/recipes/${id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRecipePage;
