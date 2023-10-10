const db = require('../database/connect');

class ItemDonated {
    constructor({item_id, donation_id, user_id, quantity_donated,

    quantity_remaining, expiration_date, to_dispose, verified, product_id, product_name, max_order, unit_quantity, category_name}){

        this.item_id = item_id
        this.donation_id = donation_id
        this.user_id = user_id
        this.quantity_donated = quantity_donated
        this.quantity_remaining = quantity_remaining

        this.expiration_date = expiration_date
        this.to_dispose = to_dispose
        this.verified = verified
        this.product_id = product_id
        this.product_name = product_name
        this.max = max_order
        this.category = category_name

        this.unit = unit_quantity

    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM items_donated WHERE item_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate item.");
        }
        return new ItemDonated(response.rows[0]);
    }


    static async getMultipleByDonation(donation_id){
        const response = await db.query("SELECT * FROM items_donated WHERE donation_id = $1", [donation_id])
        
        const items = response.rows.map(item => new ItemDonated(item))
        return items
    }

    async updateVerify(){
        this.verified = '1'
        const response = await db.query("UPDATE items_donated SET verified = '1' WHERE item_id = $1 RETURNING *", [this.item_id])
        return new ItemDonated(response.rows[0])
    }


    static async getAllByProductID(){
        const response = await db.query("SELECT i.product_id, p.product_name, p.category_name, COUNT(i.quantity_remaining) AS quantity_remaining, p.max_order, unit_quantity FROM items_donated i JOIN products p ON p.product_id = i.product_id WHERE verified = '1' GROUP BY i.product_id, p.product_name, p.max_order, p.unit_quantity, p.category_name");
        console.log(response.rows)
        const products = response.rows.map(item => new ItemDonated(item))
        return products
        
    }

    static async getAll(){
        const response = await db.query("SELECT i.product_id, p.product_name, max_order, quantity_remaining, verified, expiration_date, to_dispose, unit_quantity FROM items_donated i JOIN products p ON p.product_id = i.product_id");
        console.log(response)
        const products = response.rows.map(item => new ItemDonated(item))
        console.log(products)
        return products
        
    }

}


module.exports =  ItemDonated 

