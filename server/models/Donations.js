const db = require("../database/connect");
const Events = require("./Events");
const ItemDonated = require("./ItemsDonated");

class Donation {
	constructor({ donation_id, user_id, received, donation_date, status, drop_id }) {
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

	static async create(data) {
		const { user_id, items, slot_time, slot_date, type } = data;
		const event = await Events.create(type, user_id, slot_time, slot_date);
		const date = new Date();

		const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

		const response = await db.query("INSERT INTO donations (user_id, donation_date, drop_id) VALUES ($1, $2, $3) RETURNING donation_id", [Number(user_id), currentDate, event.id]);
		const donation = await Donation.getOneById(response.rows[0].donation_id);
		const query = donation.donation.queryBuilder(items);

		const responseCreateItems = await db.query(query);

		const itemList = responseCreateItems.rows.map((item) => new ItemDonated(item));

		return { event, donation, itemList };
	}

	queryBuilder(items) {
		let query = "INSERT INTO items_donated (user_id, donation_id, expiration_date, quantity_donated, quantity_remaining, product_id) VALUES";
		items.map((item) => {
			let subquery = "( '" + this.user_id + "', '" + this.id + "', '" + item.expirationDate + "', '" + item.quantityDonated + "', '" + item.quantityDonated + "', '" + item.id + "'),";
			query = query + subquery;
		});
		query = query.substring(0, query.length - 1) + " RETURNING *;";
		console.log(query);
		return query;
	}

	static async getAllDonations() {
		const response = await db.query("SELECT * FROM donations");
		if (response.rows.length < 1) {
			throw new Error("Unable to locate donations.");
		}

		return response.rows.map((donation) => new Donation(donation));
	}

	static async getAllSelf(id) {
		const response = await db.query("SELECT * FROM donations WHERE user_id = $1", [id]);
		if (response.rows.length < 1) {
			throw new Error("Unable to locate donations.");
		}

		return response.rows.map((donation) => new Donation(donation));
	}

	static async getOneById(id) {
		console.log(id);
		const response = await db.query("SELECT * FROM donations WHERE donation_id = $1", [id]);
		if (response.rows.length < 1) {
			throw new Error("Unable to locate donations.");
		}

		const donation = new Donation(response.rows[0]);

		const responseItems = await ItemDonated.getMultipleByDonation(donation.id);

		return { donation, responseItems };
	}
}

module.exports = Donation;
