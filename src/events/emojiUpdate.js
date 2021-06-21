const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, oldEmoji, newEmoji) => {
    try {
        const logChannel = await r.table('settings').get(oldEmoji.guild.id)("emojiUpdateLog").default(null).run(client.con)

        let animated = {
            true: "Tak",
            false: "Nie"
        }

        const logEmbed = new Discord.MessageEmbed()
            .setTitle("Edytowano emoji")
            .addField("Nazwa przed", oldEmoji.name ||"Brak")
            .addField("Nazwa po", newEmoji.name ||"Brak")
            .addField("ID", oldEmoji.id ||"Brak")
            .addField("Animowana?", animated[newEmoji.animated] ||"Brak")
            .setImage(newEmoji.url)
            .setColor("#1aebc4")
        newEmoji.guild.channels.cache.get(logChannel).send(logEmbed)

        //////////
    } catch {
        null;
    }
}