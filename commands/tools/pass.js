const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Nie podano treści ogłoszenia!`)

    const channel = await r.table("settings").get(message.guild.id)("passChannel").run(client.con)
    if (!channel) return message.channel.send(`Nie ustawiono kanału podań`)

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe podanie!")
        .setDescription(args.join(" "))
        .setColor("GREEN")
    client.channels.cache.get(channel).send(embed)

    const sent = new Discord.MessageEmbed()
        .setDescription("Opublikowano podanie!")
        .setColor("GREEN")
    message.channel.send(sent)
}
exports.help = {
    name: "pass",
    description: "Wysyła podanie",
    category: "tools",
}