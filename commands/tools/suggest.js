const Discord = require("discord.js-light")
exports.run = async (client, message, args, level) => {
    if (!args[0]) return client.errorBuilder(message, `Nie podano treści propozycji!`)

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nową propozycję")
        .setDescription(args.join(" "))
        .setColor("GREEN")
        .setURL("https://krivebot.xyz")
    message.channel.send(embed).then(m => {
        m.react("👍")
        m.react("👎")
    })
}
exports.help = {
    name: "suggest",
    description: "Wyswietla propozycję",
    category: "tools",
}