const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ order: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a todo
router.post("/", async (req, res) => {
  try {
    const maxOrder = await Todo.findOne().sort({ order: -1 });
    const newOrder = maxOrder ? maxOrder.order + 1 : 0;
    const todo = new Todo({
      content: req.body.content,
      order: newOrder,
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (req.body.content) todo.content = req.body.content;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    await todo.remove();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reorder todos
router.post("/reorder", async (req, res) => {
  const { todos } = req.body;
  try {
    for (const todo of todos) {
      await Todo.findByIdAndUpdate(todo._id, { order: todo.order });
    }
    res.json({ message: "Todos reordered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
