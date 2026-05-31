import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe, getCategories } from "../services/api";
import { isLoggedIn } from "../services/auth";
import "../styles/CreateRecipePage.css";

function CreateRecipePage() {
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
    ingredients: [{ name: "", amount: "", unit: "" }],
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    // Load categories
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...formData.ingredients];
    updated[index][field] = value;
    setFormData({ ...formData, ingredients: updated });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", amount: "", unit: "" },
      ],
    });
  };

  const removeIngredient = (index) => {
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updated });
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

      const res = await createRecipe(payload);
      if (res.ok) {
        navigate("/recipes");
      } else {
        const data = await res.text();
        setError(data || "Failed to create recipe.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-recipe-page">
      <h1>Create New Recipe 🍳</h1>
      <p className="create-subtitle">Share your recipe with the community!</p>

      <form onSubmit={handleSubmit} className="create-form">
        {/* Basic Info */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label>Recipe Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Classic Pancakes"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Short description of your recipe..."
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

        {/* Time and Servings */}
        <div className="form-section">
          <h2>Time & Servings</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Prep Time (minutes)</label>
              <input
                type="number"
                name="prepTimeMinutes"
                placeholder="10"
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
                placeholder="30"
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
                placeholder="4"
                value={formData.servings}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="form-section">
          <h2>Ingredients</h2>
          {formData.ingredients.map((ing, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                placeholder="Ingredient name"
                value={ing.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Amount"
                value={ing.amount}
                onChange={(e) =>
                  handleIngredientChange(index, "amount", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Unit (g, ml, cups...)"
                value={ing.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeIngredient(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary add-ingredient-btn"
            onClick={addIngredient}
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="form-section">
          <h2>Instructions</h2>
          <div className="form-group">
            <textarea
              name="instructions"
              placeholder="Step by step instructions..."
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
            onClick={() => navigate("/recipes")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipePage;
