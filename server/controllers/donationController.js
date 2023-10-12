
const Events  = require('../models/Events')
const ItemDonated = require('../models/ItemsDonated')
const Donation = require ('../models/Donations')
const User = require ('../models/Users')


async function createDonation(req, res){   // req.body ={items:OBJECT, slot_time, slot_date, type}
    try{
        token = req.headers["authorization"]
        const user = await User.getOneByToken(token)

        const data = req.body
        const response = await Donation.create(data, user.id) 
        console.log(response)
        res.status(200).send(response)
    } catch (err) {
    res.status(403).json({"error": err.message})
    }
}

async function getAll(req, res){
    try{
        token = req.headers["authorization"] 
        const user = await User.getOneByToken(token)
        let response
        console.log(user)
        if(user.isAdmin){
            response = await Donation.getAllDonations()
        }else{
            console.log(user.id)
            response = await Donation.getAllSelf(user.id)
        }

        console.log(response)
        res.status(200).send(response)

    } catch (err) {
        res.status(403).json({"error": err.message})
        }


}

async function getOneById(req, res) {
	const id = req.params.id;
	try {
		token = req.headers["authorization"];
		const user = await User.getOneByToken(token);
		response = await Donation.getOneById(id);
		console.log(response.donation.user_id);
		if (user.isAdmin) {
			res.status(200).send(response); // {donation:OBJECT, items: list(OBJECT)}
		} else if (response.donation.user_id == user.id) {
			res.status(200).send(response);
		} else {
			res.status(403).send("You have no access");
		}
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
}

async function verifyItems(req, res) {

	const donationID = req.params.params;
	console.log(donationID);
	try {
		const donation = await Donation.getOneById(donationID);
		const verifiedItems = await dotion.updateVerify();
		res.status(201).send(verifiedItem);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
}

async function modifyStatus(req, res){
 try{
    const donationID = req.params.id
    const status = req.body.status
    console.log(status, donationID) 

    const response  = await Donation.modifyStatus(donationID, status)
    console.log('a', response) 
    res.status(203).send(response)
}
catch(error){console.log('error')}}

async function markReceived(req, res){
    // try{
       const donationID = req.params.id
       console.log(donationID) 
   
       const response  = await Donation.markAsReceived(donationID)
       console.log('a', response) 
       res.status(203).send(response)
   }
//    catch(error){console.log('error')}}


  

module.exports = { createDonation, getAll, getOneById, verifyItem, modifyStatus, markReceived };  
