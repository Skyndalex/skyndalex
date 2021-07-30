const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")

module.exports = async (client, channel, newChannel, oldChannel) => {
    const g = await r.table("logs").get(channel.guild.id).run(client.con)

    if (!g.channelUpdateLogActivate) return 

    if (channel.type === "category") {
        const categoryEmbed = new MessageEmbed()
        .setTitle("Logi: Zaktualizowano kategorię!")
        .addField("ID", channel.id)
        .setColor("YELLOW")
        .setTimestamp()
        if (oldChannel.name) categoryEmbed.addField("Nazwa kategorii przed", oldChannel.name)
        if (newChannel.name) categoryEmbed.addField("Nazwa kategorii po", newChannel.name)
        if (oldChannel.rawPosition) categoryEmbed.addField("Pozycja przed", oldChannel.rawPosition)
        if (newChannel.rawPosition) categoryEmbed.addField("Pozycja po", newChannel.rawPosition)
        channel.guild.channels.cache.get(g.channelDeleteLog).send(categoryEmbed)
    } else {
        const logEmbed = new MessageEmbed()
        .setTitle("Logi: Zaktualizowano kanał!")
        .addField("Nazwa kanału", channel.name)
        .addField("ID", channel.id)
        .setTimestamp()
        .setColor("YELLOW")
        if (oldChannel.name) logEmbed.addField("Nazwa kanału przed", oldChannel.name)
        if (newChannel.name) logEmbed.addField("Nazwa kanału po", newChannel.name)
        if (oldChannel.rawPosition) logEmbed.addField("Pozycja przed", oldChannel.rawPosition)
        if (newChannel.rawPosition) logEmbed.addField("Pozycja po", newChannel.name)
        if (oldChannel.topic) logEmbed.addField("Temat przed", oldChannel.topic)
        if (newChannel.topic) logEmbed.addField("Temat po", newChannel.topic)
        channel.guild.channels.cache.get(g.channelDeleteLog).send(logEmbed)
    }
}