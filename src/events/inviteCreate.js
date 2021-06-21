const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, invite) => {
    try {
        const logChannel = await r.table("settings").get(invite.channel.guild.id)("inviteCreateLog").default(null).run(client.con)

        const logEmbed = new Discord.MessageEmbed()
            .setTitle("Utworzono zaproszenie!")
            .addField("Kanał z zaproszeniem", invite.channel ||"Brak")
            .addField("Link", invite.url ||"Brak")
        logEmbed.setTimestamp()
            .setColor("GREEN")
        invite.guild.channels.cache.get(logChannel).send(logEmbed)
    } catch {
        null;
    }
}