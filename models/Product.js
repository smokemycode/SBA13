// Load Mongoose
import mongoose from 'mongoose';

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Product name is required'],
    },
    description: {
        type: String,
        required: [ true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [ true, 'Product price is required'],
        validate: {
            validator: (value) => value >0, message: 'Product price must be greater than zero'
            },
        },
    category: {
        type: String,
        required: [ true, 'Product category is required'],
    },
    inStock: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Export the Product model
export default Product;