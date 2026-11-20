import 'dotenv/config.js';
import express from 'express';

// Create the app
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Zenith Product is running!'})
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

