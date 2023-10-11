const { Router } = require('express');

const requestController = require('../controllers/requestController');


const requestRouter = Router();

requestRouter.post('/', requestController.create) 
requestRouter.get('/', requestController.getAll)      
requestRouter.get('/:id', requestController.getOneById) 

requestRouter.patch('/collected/:id', requestController.collected)      
module.exports = requestRouter;