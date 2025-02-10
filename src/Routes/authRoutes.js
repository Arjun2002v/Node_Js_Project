import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db";

const router = express.Router();

//For Registering with UserName and PASSWORD

router.post("/register", (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  res.sendStatus(201);

  try {
    //Insert the user to the DB
    const insertUser = db.prepare(
      `INSERT INTO users(username,password) VALUES(?,?)`
    );
    const result = insertUser.run(userName, hasdedPass);

    // Default todo
    const defTodo = `Add your First Todo`;
    const insertTodo = db.prepare(`INSERT INTO todo(user_id,task)VALUES(?,?)`);
    insertTodo.run(result.lastInsertRowid, defTodo);

    //create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (error) {
    console.log(error.message);
  }

  //To Encrypt the password
  const hasdedPass = bcrypt.hashSync(password, 8);
});
router.post("/login", (req, res) => {}); //For Login the users

export default router;
