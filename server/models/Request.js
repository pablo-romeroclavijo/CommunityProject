const db = require('../database/connect');
const Events  = require('./Events')
const ItemRequested = require('./ItemRequested')



class Request {

    constructor({request_id, user_id, status, request_date}) {
        this.id = request_id;
        this.user_id = user_id;
        this.status = status;
        this.request_date = request_date;


    }


    queryBuilder(items, event_id) {
        let query = 'INSERT INTO items_requested (request_id, event_id, product_id, quantity_requested) VALUES'
        items.map(item =>{
            let subquery = "( '" + this.id + "', '" + event_id + "', '" +item.product_id + "', '" + item.quantity_requested + "'),"
            query = query + subquery
        })
        query = query.substring(0, query.length - 1)+ ' RETURNING *;'
        console.log(query)
        return query
 
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM Requests WHERE Request_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate Request.");
        }
        return new Request(response.rows[0]);
    }

    static async create(data, user_id, type){
        const items = data 
        const event = await Events.create(type)
        const date = new Date()
        //console.log(event)

        const currentDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 


        const response = await db.query("INSERT INTO requests (user_id, request_date) VALUES ($1, $2) RETURNING Request_id", [Number(user_id), currentDate])
        const request = await Request.getOneById(response.rows[0].request_id)
        //console.log(request.request)
        const query = request.request.queryBuilder(items, event.id)


        const responseCreateItems = await db.query(query)

        const itemList = await ItemRequested.getMultipleByRequest(response.rows[0].request_id)
        //responseCreateItems.rows.map(item => new ItemRequested(item) )

        return {event, request, itemList} 
    } 


    static async getAllRequests(){
        const response = await db.query("SELECT * FROM requests");
        if (response.rows.length < 1) {
            throw new Error("Unable to locate Requests.");
        }

        return response.rows.map(request => new Request(request))
    }

    static async getAllSelf(id){
        const response = await db.query("SELECT * FROM requests WHERE user_id = $1", [id]);
        if (response.rows.length < 1) {
            throw new Error("Unable to locate Requests.");
        }

        return response.rows.map(Request => new Request(Request))

    }

    static async getOneById(id){
        //console.log(id)
        const response = await db.query("SELECT * FROM Requests WHERE Request_id = $1", [id]);
        if (response.rows.length < 1) {
            throw new Error("Unable to locate Requests.");
        }

        const request = new Request(response.rows[0])

        const responseItems = await ItemRequested.getMultipleByRequest(request.id)


        return {request, responseItems}

    }
}


module.exports = Request

