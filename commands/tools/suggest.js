const Discord = require("discord.js-light")
const r = require("rethinkdb")
exports.run = async (client, message, args, level) => {
    if (!args[0]) return client.error(message, `Nie podano treści propozycji!`)

    const channel = await r.table("settings").get(message.guild.id).run(client.con)
    if (!channel) return client.error(message, `Nie ustawiono kanału propozycji!`)

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nową propozycję")
        .setDescription(args.join(" "))
        .setColor("GREEN")
        .setURL("https://krivebot.xyz")
    client.channels.cache.get(channel.suggestionsChannel).send(embed).then(m => {
        m.react("👍")
        m.react("👎")
    })
    message.channel.send("Wysłano propozycję")
}
exports.help = {
    name: "suggest",
    description: "Wyswietla propozycję",
    category: "tools",
}