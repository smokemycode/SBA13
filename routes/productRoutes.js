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

// GET all products with filters
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy, page, limit } = req.query;
        // Start empty and only add filters if they exist
        const filter = {};
        if (category) filter.category = category;
        // Price range
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        // Sorting
        const sortOptions = {
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            name_asc: { name: 1 },
            newest: { createdAt: -1 },
        };
        // Use the matching sort option or default to no sort
        const sort = sortOptions[sortBy] || {};
        // Pagination default to page 1, 10 per page
        const pageNum = Math.max(parseInt(page) || 1, 1);
        const limitNum = Math.max(parseInt(limit) || 10, 1);
        // Skip the products on previous pages
        const skip = (pageNum - 1) * limitNum;
        const products = await Product.find(filter).sort(sort).skip(skip).limit(limitNum);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET one product by ID
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

// DELETE a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
export default router;