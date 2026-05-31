// Base URL of our backend API
const API_URL = "https://localhost:7288/api";

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper function to make authenticated requests
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ─── AUTH ───────────────────────────────────────────
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
};

// ─── RECIPES ────────────────────────────────────────
export const getRecipes = async () => {
  const res = await fetch(`${API_URL}/Recipes`);
  return res.json();
};

export const getRecipeById = async (id) => {
  const res = await fetch(`${API_URL}/Recipes/${id}`);
  return res.json();
};

export const createRecipe = async (data) => {
  const res = await fetch(`${API_URL}/Recipes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res;
};

export const updateRecipe = async (id, data) => {
  const res = await fetch(`${API_URL}/Recipes/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res;
};

export const deleteRecipe = async (id) => {
  const res = await fetch(`${API_URL}/Recipes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res;
};

// ─── CATEGORIES ─────────────────────────────────────
export const getCategories = async () => {
  const res = await fetch(`${API_URL}/Categories`);
  return res.json();
};

// ─── FAVORITES ──────────────────────────────────────
export const getFavorites = async () => {
  const res = await fetch(`${API_URL}/Favorites`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const addToFavorites = async (recipeId) => {
  const res = await fetch(`${API_URL}/Favorites/${recipeId}`, {
    method: "POST",
    headers: authHeaders(),
  });
  return res;
};

export const removeFromFavorites = async (recipeId) => {
  const res = await fetch(`${API_URL}/Favorites/${recipeId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res;
};
