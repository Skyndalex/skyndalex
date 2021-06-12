const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const arr = ["817883855310684180"];
    if (!arr.includes(message.author.id)) return message.channel.send(message, "Niedostępne dla użytkowników")

    if (!args[0]) return client.error(message, `Nie podano treści ogłoszenia!`)

    const channel = await r.table("settings").getAll(message.guild.id)("globalBroadcastChannel").run(client.con)

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe, globalne ogłoszenie!")
        .setDescription(`${args.join(" ")}\n\nOpublikował: ${message.author.tag}`)
        .setColor("GREEN")
        .setURL(client.url)
    client.channels.cache.get(channel).send(embed)
}
exports.help = {
    name: "global-send",
    description: "Wysyła globalne ogłoszenie",
    category: "developers",
}