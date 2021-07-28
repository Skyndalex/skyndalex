import { MessageEmbed } from "discord.js";
const r = require("rethinkdb")

module.exports = async (client, channel) => {
    const g = await r.table("logs").get(channel.guild.id).run(client.con)

    if (!g.channelDeleteLogActivate) return 

    if (channel.type === "category") {
        const categoryEmbed = new MessageEmbed()
        .setTitle("Logi: Usunięto kategorię!")
        .addField("Nazwa kategorii", channel.name)
        .addField("ID", channel.id)
        .addField("Pozycja", channel.rawPosition)
        .setColor("RED")
        channel.guild.channels.cache.get(g.channelDeleteLog).send(categoryEmbed)
    } else {
        const logEmbed = new MessageEmbed()
        .setTitle("Logi: Usunięto kanał!")
        .addField("Nazwa kanału", channel.name)
        .addField("ID", channel.id)
        .addField("Pozycja", channel.rawPosition)
        .addField("Typ", client.types[channel.type])
        .setTimestamp()
        .setColor("RED")
        if(channel.topic&&channel.type!="voice") embed.addField('Temat', logEmbed.topic)
        channel.guild.channels.cache.get(g.channelDeleteLog).send(logEmbed)
    }
}