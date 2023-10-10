const db = require("../database/connect");

class User {
	constructor({ user_id, username, identity_verified, password, is_admin, postcode, email, family_unit }) {
		this.id = user_id;
		this.username = username;
		this.password = password;
		this.isAdmin = is_admin;
		this.verified = identity_verified;
		this.postcode = postcode;
		this.email = email;
		this.familyUnit = family_unit;
	}

    constructor({user_id, username, identity_verified, password, is_admin, postcode, email, family_unit}) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.isAdmin = is_admin;
        this.verified = identity_verified;
        this.postcode = postcode;
        this.email = email;
        this.familyUnit = family_unit;
    }

	static async getOneById(id) {
		const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
		if (response.rows.length != 1) {
			throw new Error("Unable to locate user.");
		}
		return new User(response.rows[0]);
	}

	static async getOneByUsername(username) {
		const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
		if (response.rows.length != 1) {
			throw new Error("Unable to locate user.");
		}
		return new User(response.rows[0]);
	}

	static async getOneByToken(token) {
		const responseToken = await db.query("SELECT user_id FROM token WHERE token = $1", [token]);
		if (responseToken.rows.length != 1) {
			throw new Error("Unable to locate user.");
		}
		const user = await User.getOneById(responseToken.rows[0].user_id);
		return user;
	}

	static async create(data) {
		const { username, password, postcode, email } = data;
		const response = await db.query("INSERT INTO user_account (username, postcode, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id;", [username, postcode, email, password]);

		const newId = response.rows[0].user_id;
		const newUser = await User.getOneById(newId);
		console.log(newUser);
		return newUser;
	}
}

module.exports = User;
