import express from 'express';
import Product from '../models/Product.js';

// Create a router
const router = express.Router();

// POST a new product
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// GET all products
router.get('/', (req, res) => {
    res.json({ message: 'Product routes connected!' });
});

// Export the router
export default router;