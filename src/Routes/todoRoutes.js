import express from "express";
import db from "../db";

const router = express.Router();

// Get the Todos for the users
router.get("/", (req, res) => {});

//Create a new Todo
router.post("/", (req, res) => {});

//To Update an existing Todo
router.put("/:id", (req, res) => {});

//To delete a todo from the user
router.delete("/:id", (req, res) => {});

export default router;
