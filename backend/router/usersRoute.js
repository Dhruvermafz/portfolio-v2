const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
  addUser,
} = require("../controllers/usersController");
const jwt = require("../middlewares/jwt");
const isAdmin = require("../middlewares/isAdmin");
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/add", addUser);
// User management routes (requires authentication)
authRouter.get("/:id", jwt.verifyToken, getUserById);
authRouter.get("/", getUsers);
authRouter.delete("/:id", jwt.verifyToken, isAdmin, deleteUser);
authRouter.put("/:id", jwt.verifyToken, isAdmin, updateUser);
module.exports = authRouter;
