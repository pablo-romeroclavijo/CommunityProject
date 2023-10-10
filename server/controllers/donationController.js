const Events  = require('../models/Events')
const ItemDonated = require('../models/ItemsDonated')
const Donation = require ('../models/Donations')
const User = require ('../models/Users')


async function createDonation(req, res){   // req.body ={user_id, items:OBJECT, slot_time, slot_date, type}
    try{
        const data = req.body
        const response = await Donation.create(data) 
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

async function getOneById(req, res){
    const id = req.params.id
    try{
        token = req.headers["authorization"]
        const user = await User.getOneByToken(token)
        response = await Donation.getOneById(id)
        console.log(response.donation.user_id)
        if(user.isAdmin){
            res.status(200).send(response)          // {donation:OBJECT, items: list(OBJECT)}
        }else if(response.donation.user_id == user.id){
            res.status(200).send(response)
        }else{
            res.status(403).send('You have no access')}

    } catch (err) {
        res.status(403).json({"error": err.message})
        }

}

async function verifyItem(req, res){
    const itemId = req.params.itemid
    console.log(itemId)
    try{
        const item = await ItemDonated.getOneById(itemId)
        const verifiedItem = await item.updateVerify()
        res.status(201).send(verifiedItem)



    } catch (err) {
        res.status(403).json({"error": err.message})
        }



}

module.exports = { createDonation, getAll, getOneById, verifyItem }