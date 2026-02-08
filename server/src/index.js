require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB - Woodify DB');
    } catch (err) {
        console.warn('MongoDB Connection Failed (Running in Offline Mode):', err.message);
        // Do not exit process, allow server to run for frontend demo
    }
};
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Woodify API is running (Status: ' + (mongoose.connection.readyState === 1 ? 'Online' : 'Offline') + ')');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
