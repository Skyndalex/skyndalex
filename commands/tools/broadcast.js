const Discord = require("discord.js-light")
exports.run = async (client, message, args, level) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.errorBuilder(message, 'Nie masz permisji!')
    if (!args[0]) return client.error(message, `Nie podano treści ogłoszenia!`)

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe ogłoszenie")
        .setDescription(args.join(" "))
        .setColor("GREEN")
        .setURL(client.url)
    message.channel.send(embed)
}
exports.help = {
    name: "broadcast",
    description: "Wyswietla ogłoszenie",
    category: "tools",
}