const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, invite) => {
    const logChannel = await r.table("settings").get(invite.channel.guild.id)("inviteCreateLog").run(client.con)

    const logEmbed = new Discord.MessageEmbed()
        .setTitle("Utworzono zaproszenie!")
        .addField("Kanał z zaproszeniem", invite.channel)
        .addField("Link", invite.url)
        logEmbed.setTimestamp()
        .setColor("GREEN")
    invite.channel.guild.channels.cache.get(logChannel).send(logEmbed)
}