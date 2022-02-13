const r = require("rethinkdb")

module.exports = {
    name: "roleDelete",
    once: false,

   async execute(client) { 
        const logChannel = await r.table("logs").get(role.guild.id)("roleCreate").run(client.con)

    }
}