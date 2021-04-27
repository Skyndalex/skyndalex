const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    let member = message.mentions.members.first()
    if (!member) return client.error(message, `Nie znaleziono użytkownika`)

    if(!message.member.hasPermission('BAN_MEMBERS')) return client.error(message, 'Nie masz permisji do banowania!')

    if (!args[0]) return client.error(message, `Nie podano użytkownika`)


    if (member.id === message.author.id) return client.error(message, 'Nie możesz zbanować samego siebie!')
    if (member.id === message.guild.ownerID) return client.error(message, 'Nie możesz zbanować właściciela serwera')
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.error(message, 'Nie możesz zbanować użytkownika z taką samą lub wyższą rolą')

   await member.ban({reason: `Banned by ${message.author.tag}`})

        const embed = new Discord.MessageEmbed()
            .setTitle("Zbanowano pomyślnie użytkownika!")
            .addField("Serwer", message.guild.name)
            .addField("Moderator", message.author.tag)
            .addField("Użytkownik", member.user.tag)
            .setFooter(client.moderationFooter)
            .setColor("#ff8900")
        message.channel.send(embed)
}
exports.help = {
    name: "ban",
    aliases: ["zbanuj"],
    category: "moderation",
}