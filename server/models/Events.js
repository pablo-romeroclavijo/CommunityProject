const db = require("../database/connect");

class Events {


    constructor({event_id, code, type, QR_code, slot_date, slot_time}) {
        this.id = event_id;
        this.type = type
        this.code = code;
        this.QR = QR_code;
        this.slot_date = slot_date;
        this.slot_time = slot_time;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM events WHERE event_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate donation.");
        }
        return new Events(response.rows[0]);
    }

    static async create(type, slot_time, slot_date ){
        const code = type + '-' + Events.makeid(4)
        const QR_code = '<url>'
        console.log('aa', slot_time) 
        const response  = await db.query('INSERT INTO events (type, slot_date, slot_time, QR_code_URL, code) VALUES ($1, $2, $3, $4, $5) RETURNING event_id', [type, slot_date, slot_time, QR_code, code])
        const event_id = response.rows[0].event_id

        const event = await Events.getOneById(event_id)
        return event

    }

          
    static makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }

}

module.exports = Events;
