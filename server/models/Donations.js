const db = require("../database/connect");
const donationRouter = require("../routes/donationsRoutes");
const Events = require("./Events");
const ItemDonated = require("./ItemsDonated");

class Donation {


    constructor({donation_id, user_id, received, donation_date, status, drop_id}) {
        this.id = donation_id;
        this.user_id = user_id;
        this.received = received;
        this.donation_date = donation_date;
        this.status = status;
        this.drop_id = drop_id;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM donations WHERE donation_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate donation.");
        }
        return new Donation(response.rows[0]);
    }


    static async modifyStatus(id, status){
        console.log('a', id, status)
        const response = await db.query('UPDATE donations SET status = $1 WHERE donation_id = $2 RETURNING *', [status, id])
  
        const donation = new Donation(response.rows[0])

        return donation
    }

    static async create(data, user_id){
        //console.log(data)
        const {items, slot_time, slot_date} = data 
        //console.log(items)
        const event = await Events.create("D", slot_time, slot_date)
        const date = new Date()

        const currentDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 


        const response = await db.query("INSERT INTO donations (user_id, donation_date, drop_id) VALUES ($1, $2, $3) RETURNING donation_id", [Number(user_id), currentDate, event.id ])
        const donation = await Donation.getOneById(response.rows[0].donation_id)
        //console.log(donation.donation)
        const query = donation.donation.queryBuilder(items)

        const responseCreateItems = await db.query(query)

        const itemList = await ItemDonated.getMultipleByDonation(response.rows[0].donation_id)

        return {event, donation, itemList} 
    } 

    queryBuilder(items){
        let query = 'INSERT INTO items_donated (user_id, donation_id, expiration_date, quantity_donated, quantity_remaining, product_id) VALUES'
        items.map(item =>{
            let subquery = "( '" + this.user_id + "', '" + this.id + "', '" + item.expiration_date + "', '" +item.quantity_donated + "', '" + item.quantity_donated + "', '" + item.product_id + "'),"
            query = query + subquery
        })
        query = query.substring(0, query.length - 1)+ ' RETURNING *;'
        //console.log(query)
        return query
 
    }

    static async getAllDonations(){
        const response = await db.query("SELECT * FROM donations");
        if (response.rows.length < 1) {
            throw new Error("Unable to locate donations.");
        }

        return response.rows.map(donation => new Donation(donation))
    }

    static async getAllSelf(id){
        const response = await db.query("SELECT * FROM donations WHERE user_id = $1", [id]);
        if (response.rows.length < 1) {
            throw new Error("Unable to locate donations.");
        }

        return response.rows.map(donation => new Donation(donation))

    }

    static async getOneById(id){
        console.log(id)
        const response = await db.query("SELECT * FROM donations WHERE donation_id = $1", [id]);
        if (response.rows.length < 1) {
            throw new Error("Unagit add .le to locate donations.");
        }
        console.log('aa', response.rows[0])
        const donation = new Donation(response.rows[0])
        console.log('aa', response.rows[0])

        const responseItems = await ItemDonated.getMultipleByDonation(donation.id)
    
        const event = await Events.getOneById(donation.drop_id)

        return {donation, responseItems, event}

    }



}

module.exports = Donation;
