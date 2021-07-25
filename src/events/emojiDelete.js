const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, emoji) => {
        const g = await r.table("settings").get(emoji.guild.id).run(client.con)
        if (!g.emojiDeleteLogActivate) return 

        const logEmbed = new MessageEmbed()
            .setTitle("Usunięto emoji!")
            .addField("Nazwa", emoji.name || "Brak")
            .addField("ID", emoji.id || "Brak")
            .addField("Animowana?", client.tof[emoji.animated] || "Brak")
            .addField("URL", emoji.url || "Brak")
            .setImage(emoji.url || null)
            .setColor("RED")
        emoji.guild.channels.cache.get(g.emojiDeleteLog).send(logEmbed)
}