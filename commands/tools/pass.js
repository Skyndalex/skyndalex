const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Nie podano treści ogłoszenia!`)

    const channel = await r.table("settings").get(message.guild.id).run(client.con)
    if (!channel) return client.error(message, `Nie ustawiono kanału ogłoszeń`)

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe podanie!")
        .setDescription(args.join(" "))
        .setColor("GREEN")
    client.channels.cache.get(channel.passChannel).send(embed)

    const sent = new Discord.MessageEmbed()
        .setDescription("Opublikowano podanie!")
        .setColor("GREEN")
}
exports.help = {
    name: "pass",
    description: "Wysyła podanie",
    category: "tools",
}