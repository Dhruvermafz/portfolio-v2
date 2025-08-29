// PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // or use context/auth hook
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
