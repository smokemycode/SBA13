import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB connected: ${mongoose.connection.host}`)
        } catch (error) {
            console.error('MongoDB connection error:', error.message);
            process.exit(1);
        }
    };

    // Log problems that happen after the initial connection
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB error:', err.message);
    });

    // Share the connection for use in other modules
    export default connectDB;