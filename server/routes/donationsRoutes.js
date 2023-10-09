const { Router } = require('express');

const donationController = require('../controllers/donationController');

const donationRouter = Router();

donationRouter.post('/', donationController.createDonation)  //to be built
donationRouter.get('/', donationController.getAll)            //to be built
donationRouter.get('/:code', donationController.getOnebyCode) //to be built

donationRouter.patch('/item=:itemid', donationController.verifyItem)        //to be built
donationRouter.patch('/donation=:id', donationController.modifyDonation)   //to be built Modify Status and Received



module.exports = userRouter;