const Discord = require("discord.js-light")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.error(message, 'Nie masz permisji!')
    if (!args[0]) return client.error(message, `Nie podano treści ogłoszenia!`)

    const channel = await r.table("settings").get(message.guild.id).run(client.con)
    if (!channel) return client.error(message, `Nie ustawiono kanału ogłoszeń`)

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe ogłoszenie")
        .setDescription(args.join(" "))
        .setColor("GREEN")
        .setURL(client.url)
    client.channels.cache.get(channel.broadcastChannel).send(embed)
    message.channel.send("Wysłano ogłoszenie.")
}
exports.help = {
    name: "broadcast",
    description: "Wyswietla ogłoszenie",
    category: "tools",
}