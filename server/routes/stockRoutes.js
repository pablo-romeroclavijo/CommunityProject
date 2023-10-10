const { Router } = require('express');

const stockController = require('../controllers/stockControler');

const stockRouter = Router();

stockRouter.get('/', stockController.getAll)            
stockRouter.get('/admin', stockController.getAllAdmin)   
//stockRouter.get('/top', stockController.getTop)     // to be built e    


module.exports = stockRouter;   