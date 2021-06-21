const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, emoji) => {
    try {
        const logChannel = await r.table("settings").get(emoji.guild.id)("emojiCreateLog").default(null).run(client.con)

        let animated = {
            true: "Tak",
            false: "Nie"
        }
        const logEmbed = new Discord.MessageEmbed()
            .setTitle("Utworzono emoji!")
            .addField("Nazwa", emoji.name || "Nie znaleziono informacji")
            .addField("ID", emoji.id || "Nie znaleziono informacji")
            .addField("Animowana?", animated[emoji.animated] || "Nie znaleziono informacji")
            .addField("URL", emoji.url || "Nie znaleziono informacji")
            .setImage(emoji.url || null)
            .setColor("GREEN")
        emoji.guild.channels.cache.get(logChannel).send(logEmbed)
    } catch {
        null;
    }
}