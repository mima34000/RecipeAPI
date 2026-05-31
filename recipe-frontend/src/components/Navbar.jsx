import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, getUserRole, removeToken } from "../services/auth";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const role = getUserRole();

  const handleLogout = () => {
    removeToken();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🍳 RecipeApp</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>

        {loggedIn && <Link to="/favorites">My Favorites</Link>}

        {loggedIn && role === "Admin" && <Link to="/admin">Admin</Link>}
      </div>

      <div className="navbar-auth">
        {loggedIn ? (
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
