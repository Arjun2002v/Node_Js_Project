import express from "express"; // Import Express.js framework
import path, { dirname } from "path"; // Import path module to work with file paths
import { fileURLToPath } from "url"; // Convert URL to file path (needed for ES modules)

// Initialize Express application
const app = express();

// Define the port (use environment variable if available, otherwise default to 5000)
const PORT = process.env.PORT || 5000;

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = dirname(__filename);

// Middleware: Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// Define a route to serve the "index.html" file when the user accesses "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server and listen on the defined PORT
app.listen(PORT, () => {
  console.log(`Hi you are running in the PORT ${PORT}`);
});
