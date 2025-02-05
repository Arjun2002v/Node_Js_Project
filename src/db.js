
import {DatabaseSync} from 'node:sqlite' 

//Creating our DB to store the Data
const db = new DatabaseSync(':memory:')

//Executing the SQL from string from Excel Sheets etc

//1.Table for user 
db.exec(`
    CREATE TABLE user(

    id INTEGER PRIMARY KEY AUTOINCREMENT, // for every todo there will be a specific user 
    username TEXT UNIQUE,
    password TEXT 
    )`)

//2.Table for Todo
db.exec(`
    CREATE TABLE todo(
    id INTEGER,
    user_id INTEGER
    )`)


export default db;