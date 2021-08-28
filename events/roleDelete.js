const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "roleDelete",
    once: false,

    execute(client) { 
        const logChannel = await r.table("logs").get(role.guild.id)("roleCreate").run(client.con)

    }
}