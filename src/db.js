import { DatabaseSync } from "node:sqlite"; // Import SQLite's synchronous database module

// 🔹 Creating an in-memory SQLite database (temporary, erased when the server restarts)
const db = new DatabaseSync(":memory:");

// 🔹 Creating a "user" table to store user data
db.exec(`
    CREATE TABLE user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unique ID for each user (auto-increments)
        username TEXT UNIQUE,                  -- Each user must have a unique usernamegit 
        password TEXT                           -- Password stored as plain text (⚠️ Not secure, use hashing!)
    )`);

// 🔹 Creating a "todo" table to store tasks related to users
db.exec(`
    CREATE TABLE todo(
        id INTEGER,                             -- Unique ID for each task
        user_id INTEGER,                        -- Foreign key linking the task to a user
        task TEXT,                              -- Task description
        completed BOOLEAN DEFAULT 0,            -- Boolean flag (0 = not completed, 1 = completed)
        FOREIGN KEY(user_id) REFERENCES user(id) -- Ensures tasks are linked to a valid user
    )`);

// 🔹 Exporting the database instance so other files can use it
export default db;
