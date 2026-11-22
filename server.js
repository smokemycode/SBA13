// Load articles needed for the server
import 'dotenv/config';
import express from 'express';
import connectDB from './config/connection.js';
import productRoutes from './routes/productRoutes.js';

// Connect to MongoDB
connectDB();

// Create the app
const app = express();

// Middleware to turn JSON bodies into JS objects
app.use(express.json());

// Set the port
const PORT = process.env.PORT || 3000;

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Zenith Product is running!'});
});

// Use the product routes
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

