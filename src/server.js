// Importing necessary modules
import { dir } from "console"; // Unnecessary import; can be removed if not used
import express from "express"; // Importing the Express framework

// Importing `path` for working with file and directory paths
import path, { dirname } from "path";
import { fileURLToPath } from "url"; // For resolving module file paths

// Initializing an Express application
const app = express();

// Setting the PORT to either the value from the environment variable or 1919
const PORT = process.env.PORT || 1919;

// Determining the current file's full path (__filename) and its directory (__dirname)
// `fileURLToPath` converts the `import.meta.url` into a file path
const __filename = fileURLToPath(import.meta.url); // Full path to the current file
const __dirname = dirname(__filename); // Directory name of the current file

// Route for handling GET requests to the root ("/")
app.get("/", (req, res) => {
  // Sends the `index.html` file located in the `publics` folder
  res.sendFile(path.join(__dirname, "publics", "index.html"));
});

// Starts the server and listens for incoming requests on the specified PORT
app.listen(PORT, () => {
  console.log("Server Started"); // Logs a confirmation message to the console
});
