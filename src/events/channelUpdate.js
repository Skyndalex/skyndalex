const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")

module.exports = async (client, channel, newChannel, oldChannel) => {
    const g = await r.table("logs").get(channel.guild.id).run(client.con)

    if (!g.channelUpdateLogActivate) return 

    if (channel.type === "category") {
        const categoryEmbed = new MessageEmbed()
        .setTitle("Logi: Zaktualizowano kategorię!")
        .addField("Nazwa kategorii", channel.name)
        .addField("Przed", oldChannel.name)
        .addField("Po", newChannel.name)
        .addField("ID", channel.id)
        .addField("Pozycja", channel.rawPosition)
        .setColor("YELLOW")
        .setTimestamp()
        channel.guild.channels.cache.get(g.channelDeleteLog).send(categoryEmbed)
    } else {
        const logEmbed = new MessageEmbed()
        .setTitle("Logi: Zaktualizowano kanał!")
        .addField("Nazwa kanału", channel.name)
        .addField("Nazwa przed", oldChannel.name)
        .addField("Nazwa po", newChannel.name)
        .addField("ID", channel.id)
        .addField("Pozycja", channel.rawPosition)
        .addField("Typ", client.types[channel.type])
        .setTimestamp()
        .setColor("YELLOW")
        if(channel.topic&&channel.type!="voice") embed.addField('Temat', logEmbed.topic)

        channel.guild.channels.cache.get(g.channelDeleteLog).send(logEmbed)
    }
}