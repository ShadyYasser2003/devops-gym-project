import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3001;

// Get the directory name using fileURLToPath for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const serverInstance = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default serverInstance;
