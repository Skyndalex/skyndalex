const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, channel) => {
    try {
        const logChannel = await r.table('settings').get(channel.guild.id)("channelCreateLog").default(null).run(client.con)

        if (channel.type === "category") {
            const logEmbed1 = new Discord.MessageEmbed()
                .setTitle("Utworzono kategorię!")
                .addField("Nazwa", channel.name||"Brak")
                .addField("ID", channel.id||"Brak")
                .addField("Pozycja", channel.rawPosition||"Brak")
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
                .addField("Nazwa", channel.name ||"Brak")
                .addField("ID", channel.id ||"Brak")
                .addField("Pozycja", channel.rawPosition ||"Brak")
                .addField("Typ", type[channel.type] ||"Brak")
                .addField("Bitrate", channel.bitrate || "Nie znaleziono danych")
                .addField("Nsfw?", nsfw[channel.nsfw] ||"Brak")
                .addField("Limit użytkowników", channel.userLimit || "Brak/nie znaleziono informacji")
                .addField("Temat kanału", channel.topic || "Nie znaleziono informacji")
                .setColor("GREEN")
            channel.guild.channels.cache.get(logChannel).send(logEmbed2)
        }
    } catch {
        null
    }
}