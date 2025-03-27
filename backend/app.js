// backend/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); // Database connection
const authRoutes = require('./routes/auth.routes'); // Authentication routes
const exchangeRoutes = require('./routes/exchange.routes'); // Exchange routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/exchanges', exchangeRoutes); // Exchange routes

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Volunteer App Backend!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Sync database and start server
const PORT = process.env.PORT || 5002;
sequelize.sync() // Sync Sequelize models with the database
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });