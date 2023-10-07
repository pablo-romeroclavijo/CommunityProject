// Imports
const express = require('express');
const cors = require('cors');
const logRoutes = require('./middleware/logger');

// Routers


// Middleware
const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

//Routes
api.get("/", (req, res) => {
    res.send('welcome to food waste api')
    })


