import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Product routes connected!' });
});

export default router;