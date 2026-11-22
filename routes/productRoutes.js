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
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT to update a product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    res.status(200).json(product);
    } catch (err) {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
            return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
export default router;