exports.run = async (client, message, args) => {
    const member = message.mentions.members.first()
    if (!member) return client.sender(message, "Błąd!", "Nie znaleziono użytkownika!", client.footer, "RED", "", "")

    if(!message.member.hasPermission('KICK_MEMBERS')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`KICK_MEMBERS\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "Błąd!", "Nie podano użytkownika!", client.footer, "RED", "", "")

    if (member.id === message.author.id) return client.sender(message, "Błąd!", "Niedozwolona metoda! Nie możesz wyrzucić samego siebie!", client.footer, "RED", "", "")
    if (member.id === message.guild.ownerID) return client.sender(message, "Błąd!", "Niedozwolona metoda! Nie możesz wyrzucić właściciela serwera!", client.footer, "RED", "", "")
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.sender(message, "Błąd!", "Nieodzwolona metoda! Nie można zbanować roli wyższej lub takiej samej.", client.footer, "RED", "", "")

   await member.kick({reason: "Used command ;kick"})

    client.sender(message, "Usunięto użytkownika z serwera pomyślnie", "", "", "GREEN", [
        {
            name: "Serwer", value: message.guild.name
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
    name: "kick",
    aliases: ["wyrzuc"],
    category: "moderation",
}