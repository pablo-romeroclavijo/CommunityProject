const ItemDonated = require ('../models/ItemsDonated')
const User = require('../models/Users')

async function getAll(req, res){
try {
    const response = await ItemDonated.getAllByProductID()
    console.log(response)
    res.status(200).send(response)

    
} catch (error) {
    res.status(400).json({"error": error.message})
}
}

async function getAllAdmin(req, res){
    console.log("here")
    try {  
        token = req.headers["authorization"]
        const user = await User.getOneByToken(token)
        console.log(user)
        if(user.isAdmin){
            console.log('here')
            const response = await ItemDonated.getAll()
            console.log(response)
            res.status(200).send(response)
            }
        else{
            res.status(403)
        }
    } catch (error) {
        res.status(403).json({"error": error.message})
    }
}


module.exports  = { getAll, getAllAdmin }  