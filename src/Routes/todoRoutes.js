import express from "express";
import db from "../db";

const router = express.Router();

// Get all todos route
// This endpoint retrieves all todos from the database
router.get("/", (req, res) => {
  // Prepare SQL query to select all todos
  const getTodo = db.prepare(`SELECT * FROM todos`);
  // Execute the query with user ID and get all results
  const todos = getTodo.all(req.userId);
  // Send todos as JSON response to the client
  res.json(todos);
});

// Create new todo route
// This endpoint handles creation of new todos
router.post("/", (req, res) => {
  // TODO: Implement todo creation logic
});

// Update existing todo route
// This endpoint updates a specific todo by ID
router.put("/:id", (req, res) => {
  // TODO: Implement todo update logic
});

// Delete todo route
// This endpoint removes a specific todo by ID
router.delete("/:id", (req, res) => {
  // TODO: Implement todo deletion logic
});

export default router;
