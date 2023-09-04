const express = require('express');
const bodyParser = require('body-parser');
const mssql = require('mssql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database configuration
const config = {
    user: 'sa',
    password: 'Munyiri@1',
    server: 'localhost',
    database: 'LinkupsSocialMedia',
};

// API endpoints

// Create a new message
app.post('/api/messages', async (req, res) => {
    // Implement code to create a new message and save it to the database
});

// Get messages between two users
app.get('/api/messages/:userId/:otherUserId', async (req, res) => {
    // Implement code to retrieve messages between the specified users
});

// Add a follow relationship
app.post('/api/follow', async (req, res) => {
    // Implement code to add a follow relationship to the database
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
