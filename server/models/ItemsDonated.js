const db = require('../database/connect');

class ItemDonated {
    constructor({item_id, donation_id, user_id, quantity_donated,
    quantity_remaining, expiration_date, to_dispose, verified, product_id}){
        this.item_id = item_id
        this.donation_id = donation_id
        this.user_id = user_id
        this.quantity_donated = quantity_donated
        this.quantity_remaining = quantity_remaining
        this.expiration_date = Date(expiration_date)
        this.to_dispose = to_dispose
        this.verified = verified
        this.product_id = product_id
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM items_donated WHERE item_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate item.");
        }
        return new ItemDonated(response.rows[0]);
    }

    async updateVerify(){
        this.verified = '1'
        const response = await db.query("UPDATE items_donated SET verified = '1' WHERE item_id = $1 RETURNING *", [this.item_id])
        return new ItemDonated(response.rows[0])
    }

}


module.exports =  ItemDonated 