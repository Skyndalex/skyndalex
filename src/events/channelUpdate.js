const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, oldChannel, newChannel) => {
    try {
        const logChannel = await r.table('settings').get(oldChannel.guild.id)("channelUpdateLog").default(null).run(client.con)

        if (oldChannel.rawPosition != newChannel.rawPosition) return
        if (oldChannel.lastPinTimestamp != newChannel.lastPinTimestamp) return

        if (oldChannel.type === "category") {
            const logEmbed1 = new Discord.MessageEmbed()
                .setTitle("Wykryto edycję kategorii!")
                .addField("Nazwa kategorii", oldChannel.name ||"Brak")
                .addField("Nazwa kategorii po edycji", newChannel.name ||"Brak")
                .addField("ID", oldChannel.id ||"Brak")
                .setColor("#1aebc4")
            oldChannel.guild.channels.cache.get(logChannel).send(logEmbed1)
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
            const embed = new Discord.MessageEmbed()
                .setTitle("Wykryto edycję kanału")
                .addField("Nazwa kanału przed edycją", oldChannel.name || "Nie znaleziono informacji")
                .addField("Nazwa kanału po edycji", newChannel.name || "Nie znaleziono informacji")
                .addField("ID", oldChannel.id || "Nie znaleziono informacji")
                .addField("Typ przed", type[oldChannel.type] || "Nie znaleziono informacji")
                .addField("Typ po", type[newChannel.type] || "Nie znaleziono informacji")
                .addField("Temat przed", oldChannel.topic || "Nie znaleziono informacji")
                .addField("Temat po", newChannel.topic || "Nie znaleziono informacji")
                .addField("Slowmode przed (w sekundach)", oldChannel.rateLimitPerUser || 'Nie znaleziono informacji')
                .addField("Slowmode po (w sekundach)", newChannel.rateLimitPerUser || "Nie znaleziono informacji")
                .addField("Czy kanał przed edycją był nsfw?", nsfw[oldChannel.nsfw] || "Nie znaleziono informacji")
                .addField("Czy kanał po edycji był nsfw?", nsfw[newChannel.nsfw] || "Nie znaleziono informacji")
                .addField("Limit użytkowników przed", oldChannel.userLimit || "Nie znaleziono informacji")
                .addField("Limit użytkowników po", newChannel.userLimit || "Nie znaleziono informacji")
                .setColor("#1aebc4")
            oldChannel.guild.channels.cache.get(logChannel).send(embed)
        }
    } catch {
        null
    }
}