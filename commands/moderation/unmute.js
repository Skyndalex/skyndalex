const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_ROLES')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_ROLES\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "204: No content", "Nie podano użytkownika!", client.footer, "RED", "", "")

    const role = await r.table("settings").get(message.guild.id)("mutedRole").run(client.con)
    if (!role) return client.sender(message, "404: Not found", "Nie ustawiono roli!", client.footer, "RED", "", "")

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!member) return client.error(message, "Nie znaleziono użytkownika!")

    if (member.id === message.author.id) return  client.sender(message, "405: Method Not Allowed", "Niedozwolona metoda! Nie możesz odciszyć samego siebie!", client.footer, "RED", "", "")
    if (member.id === message.guild.ownerID) return  client.sender(message, "405: Method Not Allowed", "Niedozwolona metoda! Nie możesz odciszyć właściciela serwera!!", client.footer, "RED", "", "")
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return  client.sender(message, "405: Method Not Allowed", "Nie możesz odciszyć użytkownika z taką samą lub wyższą rolą!!", client.footer, "RED", "", "")

   await member.roles.remove(role.mutedRole)

    client.sender(message, "Wyłączono wyciszenie użytkownika!", "", client.moderationFooter, "GREEN", [
        {
            name: "Odciszył",
            value: message.author.tag
        },
        {
            name: "Odciszony użytkownik",
            value: member.user.tag
        },
        {
            name: "Serwer",
            value: message.guild.name
        }
    ])
}
exports.help = {
    name: "unmute",
    aliases: ["odciszmito"],
    category: "moderation",
}