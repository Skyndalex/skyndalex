const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, oldEmoji, newEmoji) => {
    const logChannel = await r.table('settings').get(oldEmoji.guild.id)("emojiUpdateLog").run(client.con)

    let animated = {
        true: "Tak",
        false: "Nie"
    }

    const logEmbed = new Discord.MessageEmbed()
        .setTitle("Edytowano emoji")
        .addField("Nazwa przed", oldEmoji.name)
        .addField("Nazwa po", newEmoji.name)
        .addField("ID", oldEmoji.id)
        .addField("Animowana?", animated[newEmoji.animated])
        .setImage(newEmoji.url)
        .setColor("#1aebc4")
    newEmoji.guild.channels.cache.get(logChannel).send(logEmbed)

    //////////
}