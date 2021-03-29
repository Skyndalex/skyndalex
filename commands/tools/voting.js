const Discord = require("discord.js-light")
exports.run = async (client, message, args, level) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.error(message, 'Nie masz permisji!')
    if (!args[0]) return client.error(message, `Nie podano treści głosowania!`)

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe głosowanie")
        .setDescription(args.join(" "))
        .setColor("GREEN")
        .setURL(client.url)
    message.channel.send(embed).then(m => {
        m.react("👍")
        m.react("👎")
    })
}
exports.help = {
    name: "voting",
    description: "Wysyła głosowanie",
    category: "tools",
}