// Load .env secrets then bring in Express and Mongoose
import 'dotenv/config';
import express from 'express';
import connectDB from './config/connection.js';

// Connect to MongoDB
connectDB();

// Create the app
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Zenith Product is running!'});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

