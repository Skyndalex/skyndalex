const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, "Nie podałeś użytkownika")

    const role = await r.table("settings").get(message.guild.id)("mutedRole").run(client.con)
    if (!role) return client.error(message, "Nie ustawiono roli!")

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const user = message.mentions.users.first() || client.users.cache.get(args[0])

    if (!member) return client.error(message, "Nie znaleziono użytkownika!")
    if (!user) return client.error(message, "Nie znaleziono użytkownika")

    if (member.id === message.author.id) return client.error(message, 'Na pewno chcesz uciszyć samego siebie? xD....')
    if (member.id === message.guild.ownerID) return client.error(message, 'Nie możesz uciszyć właściciela serwera')
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.error(message, 'Nie możesz uciszyć użytkownika z taką samą lub wyższą rolą')

    await member.roles.add(role)

    const embed = new Discord.MessageEmbed()
        .setTitle("Uciszono użytkownika!")
        .addField("Uciszył", message.author.tag)
        .addField("Uciszony użytkownik", user.tag)
        .setFooter(client.moderationFooter)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "mute",
    aliases: ["wycisz"],
    category: "moderation",
}