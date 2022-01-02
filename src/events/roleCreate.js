const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "roleCreate",
    once: false,

   async execute(client, role) { 
        const logChannel = await r.table("logs").get(role.guild.id)("roleCreate").run(client.con)
    }
}