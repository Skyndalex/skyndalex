const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, channel) => {
    const logChannel = await r.table('settings').get(channel.guild.id)("channelCreateLog").run(client.con)

    if (channel.type ==="category") {
        const logEmbed1 = new Discord.MessageEmbed()
            .setTitle("Utworzono kategorię!")
            .addField("Nazwa", channel.name)
            .addField("ID", channel.id)
            .addField("Pozycja", channel.rawPosition)
            .setColor("GREEN")
        channel.guild.channels.cache.get(logChannel).send(logEmbed1)
    } else {
        let type = {
            text: "Kanał tekstowy",
            voice: "Kanał głosowy",
            news: "Kanał ogłoszeniowy",
            store: "Sklep",
            unknown: "Nieznany typ"
        }
        let nsfw = {
            true: "Tak",
            false: "Nie"
        }
        const logEmbed2 = new Discord.MessageEmbed()
            .setTitle("Utworzono kanał!")
            .addField("Nazwa", channel.name)
            .addField("ID", channel.id)
            .addField("Pozycja", channel.rawPosition)
            .addField("Typ", type[channel.type])
            .addField("Bitrate", channel.bitrate||"Nie znaleziono danych")
            .addField("Nsfw?", nsfw[channel.nsfw])
            .addField("Limit użytkowników", channel.userLimit||"Brak/nie znaleziono informacji")
            .addField("Temat kanału", channel.topic||"Nie znaleziono informacji")
            .setColor("GREEN")
        channel.guild.channels.cache.get(logChannel).send(logEmbed2)
    }
}