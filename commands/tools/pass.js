const Discord = require("discord.js-light")
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
        .setURL(client.url)
    client.channels.cache.get(channel.passChannel).send(embed)
    message.channel.send("Wysłano podanie.")
}
exports.help = {
    name: "pass",
    description: "Wysyła podanie",
    category: "tools",
}