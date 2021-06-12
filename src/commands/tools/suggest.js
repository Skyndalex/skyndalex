const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args, level) => {
    if (!args[0]) return client.error(message, `Nie podano treści propozycji!`)

    const channel = await r.table("settings").get(message.guild.id)("suggestionsChannel").run(client.con)
    if (!channel) return message.channel.send(`Nie ustawiono kanału propozycji!`)

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nową propozycję")
        .setDescription(args.join(" "))
        .setColor("GREEN")
    if (message.attachments.map(a=>a.url)[0]) embed.setImage(message.attachments.map(a=>a.url)[0])
    if (message.attachments.map(a=>a.url)[0]) embed.setFooter('W obrazku pokazane jest tylko jedno pierwsze zdjęcie!');
    client.channels.cache.get(channel).send(embed).then(m => {
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