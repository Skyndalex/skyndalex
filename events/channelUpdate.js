const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "channelUpdate",
    once: false,

    async execute(client, oldChannel, newChannel) { 
        const channelLog = await r.table("logs").get(oldChannel.guild.id)("channelUpdate").run(client.con).catch(err => {false})

        if (oldChannel.type === "GUILD_CATEGORY") {
            const logEmbed = new MessageEmbed()
            .setDescription(`**Zaktualizowano kategorię!**\n\nNazwa przed: ${oldChannel.name || "Brak" }\nID: ${oldChannel.id}\nPozycja przed: ${oldChannel.rawPosition || "Brak" }\nPozycja po: ${newChannel.rawPosition || "Brak" }`)
            .setTimestamp()
            .setColor("YELLOW")
            oldChannel.guild.channels.cache.get(channelLog).send({embeds: [logEmbed]}).catch(err => {})
        } else {
            const logEmbed2 = new MessageEmbed()
            .setDescription(`**Zaktualizowano kanał!**\n\nNazwa przed: ${oldChannel.name}\nNazwa po: ${newChannel.name}\nID: ${oldChannel.id}\nPozycja przed: ${oldChannel.rawPosition}\nPozycja po: ${newChannel.rawPosition}`)
            .setTimestamp()
            .setColor("YELLOW")
            oldChannel.guild.channels.cache.get(channelLog).send({embeds: [logEmbed2]}).catch(err => {})
        }
    }
}