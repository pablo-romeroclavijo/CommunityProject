const db = require('../database/connect');


class ItemRequested {
    constructor({item_id, request_id, event_id, user_id, quantity_requested,
      product_id, product_name, collected, fulfilled}){
        this.item_id = item_id
        this.event_id = event_id
        this.request_id = request_id
        this.user_id = user_id
        this.quantity_requested = quantity_requested
        this.product_id = product_id
        this.product_name = product_name
        this.collected = collected
        this.fulfilled = fulfilled
   
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM items_requested WHERE item_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate item.");
        }
        return new ItemRequested(response.rows[0]);
    }

    static async getMultipleByRequest(request_id){
        const response = await db.query("SELECT * FROM items_requested WHERE request_id = $1", [request_id])
        
        const items = response.rows.map(item => new ItemRequested(item))
        return items
    }

    async updateFulfilled(){
        this.fulfilled = '1'
        const response = await db.query("UPDATE items_requested SET fulfilled = '1' WHERE item_id = $1 RETURNING *", [this.item_id])
        return new ItemRequested(response.rows[0])
    }

    async updateCollected(){
        this.collected = '1'
        const response = await db.query("UPDATE items_requested SET collected = '1' WHERE item_id = $1 RETURNING *", [this.item_id])
        return new ItemRequested(response.rows[0])
    }


}


module.exports =  ItemRequested 

 