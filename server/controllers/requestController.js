
const ItemRequested = require('../models/ItemRequested')
const Request = require ('../models/Request')
const User = require ('../models/Users')


async function create(req, res){   // req.body ={items:OBJECT, slot_time, slot_date, type}
    try{
        token = req.headers["authorization"]

        const user = await User.getOneByToken(token)
        const data = req.body
        const response = await Request.create(data, user.id, 'C') 
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
            response = await Request.getAllRequests()
        }else{
            console.log(user.id)
            response = await Request.getAllSelf(user.id)
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
        response = await Request.getOneById(id)
        console.log(response.request.user_id)
        if(user.isAdmin){
            res.status(200).send(response)          // {request:OBJECT, items: list(OBJECT)}
        }else if(response.request.user_id == user.id){
            res.status(200).send(response)
        }else{
            res.status(403).send('You have no access')}

    } catch (err) {
        res.status(403).json({"error": err.message})
        }

}

async function collected(req, res){
    const itemId = req.params.itemid
    console.log(itemId)
    try{
        const item = await ItemRequested.getOneById(itemId)
        const verifiedItem = await item.updateCollected()
        res.status(201).send(verifiedItem)



    } catch (err) {
        res.status(403).json({"error": err.message})
        }



}

module.exports = { create , getAll, getOneById, collected }