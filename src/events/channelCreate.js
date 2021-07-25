const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")

module.exports = async (client, channel) => {
    const g = await r.table("logs").get(channel.guild.id).run(client.con)

    if (!g.channelCreateLogActivate) return 

    if (channel.type === "category") {
        const categoryEmbed = new MessageEmbed()
        .setTitle("Logi: Utworzono kategorię!")
        .addField("Nazwa kategorii", channel.name)
        .addField("ID", channel.id)
        .addField("Pozycja", channel.rawPosition)
        .setColor("GREEN")
        .setTimestamp()
        channel.guild.channels.cache.get(g.channelCreateLog).send(categoryEmbed)
    } else {
        const logEmbed = new MessageEmbed()
        .setTitle("Logi: Utworzono kanał!")
        .addField("Nazwa kanału", channel.name)
        .addField("ID", channel.id)
        .addField("Pozycja", channel.rawPosition)
        .addField("Typ", client.types[channel.type])
        if(channel.topic&&channel.type!="voice") embed.addField('Temat', logEmbed.topic)
        .setColor("GREEN")
        .setTimestamp()

        channel.guild.channels.cache.get(g.channelCreateLog).send(logEmbed)
    }
}