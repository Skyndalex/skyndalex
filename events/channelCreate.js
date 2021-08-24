const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "channelCreate",
    once: false,

    async execute(client, channel) { 
        const channelLog = await r.table("settings").get(channel.guild.id)("channelCreate").run(client.con).catch(err => {})

        if (channel.type === "GUILD_CATEGORY") {
            const embed = new MessageEmbed()
            .setDescription(`**Utworzono kategorię!**\n\nNazwa: ${channel.name}\nID: ${channel.id}\nPozycja: ${channel.rawPosition}`)
            .setTimestamp()
            .setColor("YELLOW")
            channel.guild.channels.cache.get(channelLog).send({embeds: [embed]})
        } else {
            const embed2 = new MessageEmbed()
            .setDescription(`**Utworzono kanał!**\nNazwa: ${channel.name}\nID: ${channel.id}\nPozycja: ${channel.rawPosition}`)
            .setTimestamp()
            .setColor("YELLOW")
            channel.guild.channels.cache.get(channelLog).send({embeds: [embed2]})
        }
    }
}