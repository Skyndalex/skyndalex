const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_ROLES')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_roles.mute\`", "", "RED", "", "")

    const role = await r.table("settings").get(message.guild.id)("mutedRole").run(client.con)
    if (!role) return message.channel.send("Nie znaleziono roli")

    const member = message.mentions.members.first()
    if (!member) return message.channel.send("Nie znaleziono użytkownika")

    if (member.id === message.author.id) return client.sender(message, "Błąd!", "Nie możesz uciszyć samego siebie!", "", "RED", "", "")
    if (member.id === message.guild.ownerID) return client.sender(message, "Błąd!", "Nie możesz uciszyć właściciela serwera!", "", "RED", "", "")
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.sender(message, "Błąd!", "Nie możesz uciszyć użytkownika z taką samą lub wyższą rolą!", client.footer, "RED", "", "")
    if (member.roles.cache.map(r=>r.id).includes(role)) return client.sender(message, "Błąd!", "Ten użytkownik jest już wyciszony!", "", "RED", "", "")

    member.roles.add(role)

    client.sender(message, "", "Pomyślnie uciszono użytkownika.", "Wyciszenie", "YELLOW", "", "", "")
}
exports.help = {
    name: "mute",
    description: "Wycisz użytkownika",
    usage: "mute [użytkownik]",
    perms: "server.manage_roles.mute",
    category: "mod"
}