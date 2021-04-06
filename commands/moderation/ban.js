const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
    let member = message.mentions.members.first()
    if (!member) return client.error(message, `Nie znaleziono użytkownika`)

    if(!message.member.hasPermission('BAN_MEMBERS')) return client.error(message, 'Nie masz permisji do banowania!')

    if (!args[0]) return client.error(message, `Nie podano użytkownika`)

    member.ban({reason: `Banned by ${message.author.tag}`})

        let embed = new Discord.MessageEmbed()
            .setTitle("Zbanowano pomyślnie użytkownika!")
            .addField("Serwer", message.guild.name)
            .addField("Moderator", message.author.tag)
            .addField("Użytkownik", member.tag)
            .setFooter("KriveBot --> Zbanowano pomyślnie!")
            .setColor("#ff8900")
        message.channel.send(embed)
}
exports.help = {
    name: "ban",
    aliases: ["zbanuj"],
    category: "moderation",
}