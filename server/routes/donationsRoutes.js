const { Router } = require("express");

const donationController = require("../controllers/donationController");
const authenticator = require("../middleware/authenticator");

const donationRouter = Router();

donationRouter.post("/", donationController.createDonation);
donationRouter.get("/", donationController.getAll); //to be built
donationRouter.get("/:id", donationController.getOneById); //to be built
donationRouter.post("/", donationController.createDonation);


donationRouter.patch("/donatiod/:id", donationController.verifyItems); //to be built
donationRouter.patch('/status/:id', donationController.modifyStatus)
donationRouter.patch('/received/:id', donationController.markReceived)   //to be built Modify Status and Received

module.exports = donationRouter;
