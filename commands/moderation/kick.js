const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    const member = message.mentions.members.first()
    if (!member) return client.error(message, `Nie znaleziono użytkownika`)

    if(!message.member.hasPermission('KICK_MEMBERS')) return client.error(message, 'Nie masz permisji do wyrzucania!')

    if (!args[0]) return client.error(message, `Nie podano użytkownika`)

    if (member.id === message.author.id) return client.error(message, 'Nie możesz wyrzucić samego siebie!')
    if (member.id === message.guild.ownerID) return client.error(message, 'Nie możesz wyrzucić właściciela serwera')
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.error(message, 'Nie możesz wyrzucić użytkownika z taką samą lub wyższą rolą')

  await member.kick({reason: "kicked"})

    const embed = new Discord.MessageEmbed()
        .setTitle("Wyrzucono pomyślnie użytkownika!")
        .addField("Serwer", message.guild.name)
        .addField("Moderator", message.author.tag)
        .addField("Użytkownik", member.user.tag)
        .setFooter(client.moderationFooter)
        .setColor("#ff8900")
    message.channel.send(embed)
}
exports.help = {
    name: "kick",
    aliases: ["wyrzuc"],
    category: "moderation",
}