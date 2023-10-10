// Imports
const express = require('express');
const cors = require('cors');
const logRoutes = require('./middleware/logger');


// Routers
const userRouter = require('./routes/usersRoutes');
const donationRouter = require('./routes/donationsRoutes')
const stockRouter = require('./routes/stockRoutes')
const requestRouter = require('./routes/requestsRoutes')

// Middleware
const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

//Routes
api.get("/", (req, res) => {
    res.send('welcome to food waste api')
    })

api.use("/user", userRouter)
api.use("/donation", donationRouter)
api.use("/stock", stockRouter)
api.use('/request', requestRouter)


module.exports = api  
