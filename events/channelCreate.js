const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "channelCreate",
    once: false,

    async execute(client, channel) {
        const channelLog = await r.table("logs").get(channel.guild.id)("channelCreate").run(client.con).catch(err => {false})
        if (!channelLog) return false; // test

        if (channel.type === "GUILD_CATEGORY") {
            const logEmbed = new MessageEmbed()
                .setDescription(`**Utworzono kategorię!**\n\nNazwa: ${channel.name || "Brak"}\nID: ${channel.id || "Brak" }\nPozycja: ${channel.rawPosition || "Brak" }`)
                .setTimestamp()
                .setColor("YELLOW")
            channel.guild.channels.cache.get(channelLog).send({ embeds: [logEmbed] }).catch(err => {})
        } else {
            const logEmbed2 = new MessageEmbed()
                .setDescription(`**Utworzono kanał!**\n\nNazwa: ${channel.name}\nID: ${channel.id}\nPozycja: ${channel.rawPosition}\nBitrate: ${channel.bitrate || "Brak"}`)
                .setTimestamp()
                .setColor("YELLOW")
            channel.guild.channels.cache.get(channelLog).send({ embeds: [logEmbed2] }).catch(err => {})
        }
    }
}