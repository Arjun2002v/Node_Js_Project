import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db";

const router = express.Router();

//For Registering with UserName and PASSWORD

router.post("/register", (req, res) => {
  //getting user from the front-end
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

router.post("/login", (req, res) => {
  //Destructuring the userName and password coming from the front-end
  const { userName, password } = req.body;

  try {
    //Checking out if the current user existing in the db
    const getUser = db.prepare(`SELECT * FROM user WHERE username=?`);
    const newUser = getUser.get(userName);
    if (!newUser) {
      return res.sendStatus(404).send({ message: "User Not Available" });
    }

    //Comparing the password stored as token wiht the password typed by the user

    const newPass = bcrypt.compareSync(password, newUser.password);
    if (!newPass) {
      return res
        .sendStatus(404)
        .send({ message: "Password incorrect or not found " });
    }
    //if it manages to pass through this then user and password is valid

    //Creating a token for a new user

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
