const db = require('../database/connect');


class User {

    constructor({user_id, username, identity_verified, password, admin, postcode, email, family_unit }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.isAdmin = admin;
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
        const responseToken = await db.query("SELECT user_id FROM user_account WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }

        const responseUser = await this.getOneById(responseToken.rows[0].user_id)
        return new User(responseUser.rows[0]);
    }

    static async create(data) {
        const {user_id, username, identity_verified, password, admin, postcode, email, family_unit} = data;
        const response = await db.query("INSERT INTO user_account (user_id, username, identity_verified, admin, postcode, email, family_unit, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id;",
            [user_id, username, identity_verified, admin, postcode, email, family_unit, password]);
        
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;