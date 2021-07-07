const r = require("rethinkdb")
const Discord = require("discord.js")
module.exports = async(client, member) => {    
        const autorole = await r.table("autorole").get(member.guild.id).run(client.con)
        if (!autorole.activate) return

        member.roles.add(autorole.role)
    }