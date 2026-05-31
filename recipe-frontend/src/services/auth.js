// Save token to localStorage after login
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Remove token from localStorage on logout
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// Decode JWT token to get user info (role, name, etc.)
export const getUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    // JWT token has 3 parts separated by dots - the middle part has user info
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
};

// Get user role from token
export const getUserRole = () => {
  const user = getUser();
  if (!user) return null;
  return user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
};

// Get user id from token
export const getUserId = () => {
  const user = getUser();
  if (!user) return null;
  return user[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];
};
