const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, guild, user) => {
    const logChannel = await r.table("settings").get(guild.id)("guildBanAddLog").run(client.con)

    const logEmbed = new Discord.MessageEmbed()
        .setTitle("Zbanowano użytkownika!")
        .setColor("RED")

}