const Achievement = require("../models/achievement");

// Get all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching achievements", error });
  }
};

// Get achievement by ID
exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json(achievement);
  } catch (error) {
    res.status(500).json({ message: "Error fetching achievement", error });
  }
};

// Create a new achievement
exports.createAchievement = async (req, res) => {
  try {
    const newAchievement = new Achievement(req.body);
    await newAchievement.save();
    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(400).json({ message: "Error creating achievement", error });
  }
};

// Update an achievement by ID
exports.updateAchievement = async (req, res) => {
  try {
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json(updatedAchievement);
  } catch (error) {
    res.status(400).json({ message: "Error updating achievement", error });
  }
};

// Delete an achievement by ID
exports.deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await Achievement.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting achievement", error });
  }
};
