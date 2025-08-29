import { jwtDecode } from "jwt-decode";
const useAuth = () => {
  const token = localStorage.getItem("authToken");

  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);

    // Optional: Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.warn("Token has expired.");
      localStorage.removeItem("authToken");
      return null;
    }
    console.log(decodedToken);
    return decodedToken; // Contains userId, role, etc.
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default useAuth;
