const r = require("rethinkdb")
module.exports = {
    name: "roleUpdate",
    once: false,

   async execute(client, oldRole, newRole) { 
        const logChannel = await r.table("logs").get(oldRole.guild.id)("roleUpdate").run(client.con)

    }
}