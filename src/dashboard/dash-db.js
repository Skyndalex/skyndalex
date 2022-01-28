const crypto = require("crypto");

module.exports = class DashDb {
    constructor(con) {
        this.con = con;
    }

    async saveUser(access_token, refresh_token, expiresIn) {
        let id = crypto.randomBytes(20).toString('hex');

        let checkId = await r.table("users").get(id).run(this.con);
        while (checkId) {
            id = crypto.randomBytes(20).toString('hex');
            checkId = await r.table("users").get(id).run(this.con);
        }

        await r.table("users").insert({ id, access_token, refresh_token, expireTime: Date.now()+expiresIn }).run(this.con);
        return id;
    }

    async getUser(token) {
        return await r.table("users").get(token).run(this.con);
    }
}
