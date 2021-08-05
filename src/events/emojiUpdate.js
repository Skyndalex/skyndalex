const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, emoji) => {
        const g = await r.table("settings").get(emoji.guild.id).run(client.con)
        if (!g.emojiUpdateLogActivate) return 

        if (!g?.emojiUpdateLog) { 
        const logEmbed = new MessageEmbed()
            .setTitle("Zaktualizowano emoji!")
            .addField("Nazwa", emoji.name || "Brak")
            .addField("ID", emoji.id || "Brak")
            .addField("Animowana?", client.tof[emoji.animated] || "Brak")
            .addField("URL", emoji.url || "Brak")
            .setImage(emoji.url || null)
            .setColor("YELLOW")
        emoji.guild.channels.cache.get(g.emojiUpdateLog).send(logEmbed)
        }
}