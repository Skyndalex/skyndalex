const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_ROLES')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_roles.unmute\`", "", "RED", "", "")

    const role = await r.table("settings").get(message.guild.id)("mutedRole").run(client.con)
    if (!role) return message.channel.send("Nie znaleziono roli")

    const member = message.mentions.members.first()
    if (!member) return message.channel.send("Nie znaleziono użytkownika")

    if (member.id === message.author.id) return client.sender(message, "Błąd!", "Nie możesz odciszyc samego siebie!", "", "RED", "", "")
    if (member.id === message.guild.ownerID) return client.sender(message, "Błąd!", "Nie możesz odciszyć właściciela serwera!", "", "RED", "", "")
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.sender(message, "Błąd!", "Nie możesz odciszyć użytkownika z taką samą lub wyższą rolą!", client.footer, "RED", "", "")

    member.roles.remove(role)

    client.sender(message, "", "Pomyślnie odciszono użytkownika.", "Wyłączenie wyciszenia", "GREEN", "", "", "")
}
exports.help = {
    name: "unmute",
    description: "Odcisz użytkownika",
    usage: "unmute [użytkownik]",
    perms: "server.manage_roles.mute",
    category: "mod"
}