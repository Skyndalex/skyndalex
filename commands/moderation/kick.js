const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
    let member = message.mentions.members.first()
    if (!member) return client.errorBuilder(message, `Nie znaleziono użytkownika`)

    if(!message.member.hasPermission('KICK_MEMBERS')) return client.error(message, 'Nie masz permisji do wyrzucania!')

    if (!args[0]) return client.errorBuilder(message, `Nie podano użytkownika`)

    member.kick({reason: `Kicked by ${message.author.tag}`})

    const embed = new Discord.MessageEmbed()
        .setTitle("Wyrzucono pomyślnie użytkownika!")
        .addField("Serwer", message.guild.name)
        .addField("Moderator", message.author.tag)
        .setFooter("KriveBot --> Wyrzucono pomyślnie!")
        .setColor("#ff8900")
    message.channel.send(embed)
}
exports.help = {
    name: "kick",
    aliases: ["wyrzuc"],
    category: "moderation",
}