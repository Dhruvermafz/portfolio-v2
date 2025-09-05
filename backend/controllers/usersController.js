const bcrypt = require("bcrypt");
const jwt = require("../middlewares/jwt"); // Update the path as needed
const User = require("../models/user");

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, photo } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      photo,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.createToken({ userId: user._id, role: user.role });
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // Include role in the response
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // Include role in the response
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      photo: user.photo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const formattedUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // Include role in the response
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      photo: user.photo,
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent in the Authorization header

  try {
    const decoded = jwt.verifyToken(token);
    if (decoded.error)
      return res.status(decoded.error.code).json(decoded.error.message);

    const requestingUser = await User.findById(decoded.userId);
    if (requestingUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, photo, role } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent in the Authorization header

  try {
    const decoded = jwt.verifyToken(token);
    if (decoded.error)
      return res.status(decoded.error.code).json(decoded.error.message);

    const requestingUser = await User.findById(decoded.userId);
    if (requestingUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    // Optionally hash the new password if it's being updated
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updateFields = { username, email, photo, role };
    if (hashedPassword) updateFields.password = hashedPassword;

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role, // Include role in the response
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
      photo: updatedUser.photo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};
// Add a new user directly (e.g., via admin portal)
const addUser = async (req, res) => {
  const { username, email, password, photo, role } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      photo,
      role: role || "user", // Default to 'user' role if not provided
    });
    await newUser.save();

    // Respond with the created user details
    res.status(201).json({
      message: "User added successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        photo: newUser.photo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add user" });
  }
};
module.exports = {
  addUser,
  registerUser,
  loginUser,
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
};
