exports.run = async (client, message, args) => {
    if(!message.member.permissions.has('BAN_MEMBERS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.ban_members.ban\`", "", "RED", "", "")

    const member = message.mentions.members.first()
    if (!member) return client.sender(message, "Błąd!", "Nie podałeś użytkownika!", "", "RED", "", "", "") 

    if (member.id === message.author.id) return client.sender(message, "Błąd!", "Nie możesz zbanować samego siebie!", "", "RED", "", "")
    if (member.id === message.guild.ownerID) return client.sender(message, "Błąd!", "Nie możesz zbanować właściciela serwera!", "", "RED", "", "")
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.sender(message, "Błąd!", "Niedozwolona metoda! Nie możesz zbanować użytkownika z taką samą lub wyższą rolą!", client.footer, "RED", "", "")

    const banned = await member.ban({ reason: "Zbanowany dzięki botu Krive."})

    client.sender(message, "", `Zbanowano użytkownika!\n\nZbanował: ${message.author.tag}\nZbanowany: ${member.user.tag}`, "", "ORANGE", "", "", "")
}
exports.help = {
    name: "ban",
    description: "zajeb uzytkownika mlotkiem",
    usage: "ban [użytkowni-k]",
    perms: "server.ban_members.ban",
    category: "mod"
}