const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_ROLES')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_ROLES\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "204: No content", "Nie podano użytkownika!", client.footer, "RED", "", "")

    const role = await r.table("settings").get(message.guild.id).run(client.con)

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return client.sender(message, "Błąd!", "Nie znaleziono użytkownika", client.footer, "RED", "", "")

    if (member.id === message.author.id) return client.sender(message, "Błąd!", "Niedozwolona metoda! Nie możesz wyciszyć samego siebie!", client.footer, "RED", "", "")
    if (member.id === message.guild.ownerID) return client.sender(message, "Błąd!", "Niedozwolona metoda! Nie możesz uciszyć właściciela serwera!!", client.footer, "RED", "", "")
  //  if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return  client.sender(message, "Błąd!", "Nie możesz uciszyć użytkownika z taką samą lub wyższą rolą!!", client.footer, "RED", "", "")

    await member.roles.add(role.mutedRole)

    client.sender(message, "Uciszono użytkownika!", "", "", "GREEN", [
        {
            name: "Serwer", value: message.guild.id
        },
        {
            name: "Moderator", value: message.author.tag
        },
        {
            name: "Użytkownik", value: member.user.tag
        }
    ])
    
}
exports.help = {
    name: "mute",
    aliases: ["wycisz"],
    category: "moderation",
}