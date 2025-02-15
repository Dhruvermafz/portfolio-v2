const jwt = require("./jwt"); // Adjust the path to your jwt module
const User = require("../models/user"); // Assuming you have a User model for role verification
// Authenticate User Middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found. Access denied." });
  }

  const validationResult = jwt.verifyToken(token);

  if (validationResult.error) {
    return res
      .status(validationResult.error.code)
      .json(validationResult.error.message);
  }

  req.user = validationResult; // Attach decoded data to the request object
  next();
};

// Authorize Admin Middleware
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
};
