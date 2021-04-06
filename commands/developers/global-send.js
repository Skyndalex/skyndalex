const Discord = require("discord.js-light")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const arr = ["509014773006991376"];
    if (!arr.includes(message.author.id)) return client.error(message, `Potrzebujesz uprawnień developera aby użyć tej komendy!`)

    if (!args[0]) return client.error(message, `Nie podano treści ogłoszenia!`)

    const channel = await r.table("settings").get(message.guild.id).run(client.con)

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe, globalne ogłoszenie!")
        .setDescription(`${args.join(" ")}\n\nOpublikował: ${message.author.tag}`)
        .setColor("GREEN")
        .setURL(client.url)
    client.channels.cache.get(channel.globalBroadcastChannel).send(embed)
}
exports.help = {
    name: "global-send",
    description: "Wysyła globalne ogłoszenie",
    category: "developers",
}