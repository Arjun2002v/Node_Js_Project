import express, { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  //encrypt the password
  const hacked = bcrypt.hashSync(password, 8);

  // save the user and update ie to insert the value to the
  const update_user = db.prepare(`INSERT into user(user,password) VALUES(?,?)`);
  const result = update_user.run(username, hacked);

  // after register they need to add their todo tasks
  const todo = `Add your Todo`;
  const add_todo = db.prepare(`INSERT into todos(user_id,task) VALUES(?,?)`);
  add_todo.run(result.lastInsertRowid, todo);

  //create a token
  const token = jwt.sign(
    { id: result, lastInsertRowid },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
});

router.post("/login", (req, res) => {});

export default Router;
