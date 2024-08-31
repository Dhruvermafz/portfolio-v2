const express = require("express");
const { registerUser, loginUser } = require("../controllers/usersController");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
