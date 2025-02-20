import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db";

const router = express.Router();

//For Registering with UserName and PASSWORD

router.post("/register", (req, res) => {
  // Extract username and password from request body
  const { userName, password } = req.body;
  console.log(userName, password);
  res.sendStatus(201);

  try {
    // Hash the password before storing in database
    const hasdedPass = bcrypt.hashSync(password, 8);

    // Prepare SQL query to insert new user into users table
    const insertUser = db.prepare(
      `INSERT INTO users(username,password) VALUES(?,?)`
    );
    // Execute query with username and hashed password
    const result = insertUser.run(userName, hasdedPass);

    // Create a default todo for new users
    const defTodo = `Add your First Todo`;
    const insertTodo = db.prepare(`INSERT INTO todo(user_id,task)VALUES(?,?)`);
    insertTodo.run(result.lastInsertRowid, defTodo);

    // Generate JWT token for authentication
    // Token contains user ID and expires in 24 hours
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.log(error.message);
  }

  // NOTE: This password hashing should be moved inside try block
  // before database operations
});

router.post("/login", (req, res) => {
  // Extract login credentials from request body
  const { userName, password } = req.body;

  try {
    // Check if user exists in database
    const getUser = db.prepare(`SELECT * FROM user WHERE username=?`);
    const newUser = getUser.get(userName);
    if (!newUser) {
      return res.sendStatus(404).send({ message: "User Not Available" });
    }

    // Verify password by comparing hash
    const newPass = bcrypt.compareSync(password, newUser.password);
    if (!newPass) {
      return res
        .sendStatus(404)
        .send({ message: "Password incorrect or not found " });
    }

    // If credentials are valid, generate new JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(501);
  }
}); //For Login the users

export default router;
