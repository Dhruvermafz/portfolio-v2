import { jwtDecode } from "jwt-decode";
const useAuth = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token); // Decode the token
    return decodedToken; // Returns user details from token (e.g., userId)
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
};

export default useAuth;
