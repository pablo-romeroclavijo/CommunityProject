const { Router } = require('express');

const donationController = require('../controllers/donationController');
const authenticator = require ('../middleware/authenticator')

const donationRouter = Router();

donationRouter.post('/', donationController.createDonation) 
<<<<<<< HEAD
donationRouter.get('/', donationController.getAll)      
donationRouter.get('/:id', donationController.getOneById) 
=======
donationRouter.get('/', donationController.getAll)            //to be built
donationRouter.get('/:id', donationController.getOneById) //to be built
>>>>>>> e7bf8e8f20dbd6a74c95d1fe51d41d05f60eafd2

donationRouter.patch('/item=:itemid', donationController.verifyItem)        //to be built
// donationRouter.patch('/donation=:id', donationController.modifyDonation)   //to be built Modify Status and Received



module.exports = donationRouter;