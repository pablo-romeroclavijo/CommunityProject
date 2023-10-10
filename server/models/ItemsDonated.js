const db = require('../database/connect');

class ItemDonated {
    constructor({item_id, donation_id, user_id, quantity_donated,
<<<<<<< HEAD
    quantity_remaining, expiration_date, to_dispose, verified, product_id, product_name, max_order}){
=======
    quantity_remaining, expiration_date, to_dispose, verified, product_id}){
>>>>>>> e7bf8e8f20dbd6a74c95d1fe51d41d05f60eafd2
        this.item_id = item_id
        this.donation_id = donation_id
        this.user_id = user_id
        this.quantity_donated = quantity_donated
        this.quantity_remaining = quantity_remaining
<<<<<<< HEAD
        this.expiration_date = expiration_date
        this.to_dispose = to_dispose
        this.verified = verified
        this.product_id = product_id
        this.product_name = product_name
        this.max = max_order
=======
        this.expiration_date = Date(expiration_date)
        this.to_dispose = to_dispose
        this.verified = verified
        this.product_id = product_id
>>>>>>> e7bf8e8f20dbd6a74c95d1fe51d41d05f60eafd2
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM items_donated WHERE item_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate item.");
        }
        return new ItemDonated(response.rows[0]);
    }

<<<<<<< HEAD
    static async getMultipleByDonation(donation_id){
        const response = await db.query("SELECT * FROM items_donated WHERE donation_id = $1", [donation_id])
        
        const items = response.rows.map(item => new ItemDonated(item))
        return items
    }

=======
>>>>>>> e7bf8e8f20dbd6a74c95d1fe51d41d05f60eafd2
    async updateVerify(){
        this.verified = '1'
        const response = await db.query("UPDATE items_donated SET verified = '1' WHERE item_id = $1 RETURNING *", [this.item_id])
        return new ItemDonated(response.rows[0])
    }

<<<<<<< HEAD
    static async getAllByProductID(){
        const response = await db.query("SELECT i.product_id, p.product_name, COUNT(i.quantity_remaining) AS quantity_remaining, p.max_order FROM items_donated i JOIN products p ON p.product_id = i.product_id WHERE verified = '1' GROUP BY i.product_id, p.product_name, p.max_order");
        console.log(response)
        const products = response.rows.map(item => new ItemDonated(item))
        return products
        
    }

    static async getAll(){
        const response = await db.query("SELECT i.product_id, p.product_name, max_order, quantity_remaining, verified, expiration_date, to_dispose FROM items_donated i JOIN products p ON p.product_id = i.product_id");
        console.log(response)
        const products = response.rows.map(item => new ItemDonated(item))
        console.log(products)
        return products
        
    }

}


module.exports =  ItemDonated 

 
=======
}


module.exports =  ItemDonated 
>>>>>>> e7bf8e8f20dbd6a74c95d1fe51d41d05f60eafd2
