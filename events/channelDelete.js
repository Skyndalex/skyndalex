const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "channelDelete",
    once: false,

    async execute(client, channel) { 
        const channelLog = await r.table("logs").get(channel.guild.id)("channelDelete").run(client.con).catch(err => {false})

        if (channel.type === "GUILD_CATEGORY") {
            const logEmbed = new MessageEmbed()
            .setDescription(`**Usunięto kategorię!**\n\nNazwa: ${channel.name || "Brak" }\nID: ${channel.id || "Brak" }\nPozycja: ${channel.rawPosition || "Brak" }`)
            .setTimestamp()
            .setColor("RED")
            channel.guild.channels.cache.get(channelLog).send({embeds: [logEmbed]}).catch(err => {})
        } else {
            const logEmbed2 = new MessageEmbed()
            .setDescription(`**Usunięto kanał!**\n\nNazwa: ${channel.name}\nID: ${channel.id}\nPozycja: ${channel.rawPosition}`)
            .setTimestamp()
            .setColor("RED")
            channel.guild.channels.cache.get(channelLog).send({embeds: [logEmbed2]}).catch(err => {})
        }
    }
}