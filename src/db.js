import exp from "constants";
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

//Execute Sql from strings

//1. Table for User
db.exec(`
    CREATE TABLE user(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT UNIQUE,
    password TEXT

    )`);

//2.Table for Todo's
db.exec(`
        CREATE TABLE todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task text,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id)

        )`);

export default db;
