const { Router } = require('express');

const donationController = require('../controllers/donationController');

const donationRouter = Router();

donationRouter.post('/', donationController.createDonation) 
donationRouter.get('/', donationController.getAll)      
donationRouter.get('/:id', donationController.getOneById) 

donationRouter.patch('/item=:itemid', donationController.verifyItem)        //to be built
// donationRouter.patch('/donation=:id', donationController.modifyDonation)   //to be built Modify Status and Received



module.exports = donationRouter;