import express from "express";
import db from "../db";

const router = express.Router();

// Get the Todos for the users and send it back to the user
router.get("/", (req, res) => {
  const getTodo = db.prepare(`SELECT * FROM todos`);
  const todos = getTodo.all(req.userId);
  res.json(todos); // send the response to the frontend
});

//Create a new Todo
router.post("/", (req, res) => {});

//To Update an existing Todo
router.put("/:id", (req, res) => {});

//To delete a todo from the user
router.delete("/:id", (req, res) => {});

export default router;
