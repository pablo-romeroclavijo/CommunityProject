const db = require("../database/connect");

class Events {


    constructor({event_id, code, type, qr_code_url, slot_date, slot_time}) {

        this.id = event_id;
        this.type = type
        this.code = code;
        this.QR = qr_code_url;
        this.slot_date = slot_date;
        this.slot_time = slot_time;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM events WHERE event_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate event.");
        }
        return new Events(response.rows[0]);
    }

    static async create(type, slot_time, slot_date ){
        const code = type + '-' + Events.makeid(4)
        const QR_code = `http://api.qrserver.com/v1/create-qr-code/?data=${code}&size=150x150`
        const response  = await db.query('INSERT INTO events (type, slot_date, slot_time, QR_code_URL, code) VALUES ($1, $2, $3, $4, $5) RETURNING event_id', [type, slot_date, slot_time, QR_code, code])
        const event_id = response.rows[0].event_id

        const event = await Events.getOneById(event_id)
        console.log(event)
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
