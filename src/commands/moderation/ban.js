exports.run = async (client, message, args) => {
    let member = message.mentions.members.first()
    if (!member) return client.sender(message, "Błąd!", "Nie znaleziono użytkownika!", client.footer, "RED", "", "")

    if(!message.member.hasPermission('BAN_MEMBERS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`BAN_MEMBERS\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "Błąd!", "Nie podano użytkownika!", client.footer, "RED", "", "")


    if (member.id === message.author.id) return client.sender(message, "Błąd!", "Niedozwolona metoda! Nie możesz zbanować samego siebie!", client.footer, "RED", "", "")
    if (member.id === message.guild.ownerID) return client.sender(message, "Błąd!", "Niedozwolona metoda! Nie możesz zbanować właściciela serwera!", client.footer, "RED", "", "")
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.sender(message, "Błąd!", "Niedozwolona metoda! Nie możesz zbanować użytkownika z taką samą lub wyższą rolą!", client.footer, "RED", "", "")

   await member.ban({reason: `Used command ban with bot Krive`})

    client.sender(message, "Usunięto użytkownika z serwera pomyślnie!", "", "", "GREEN", [
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
    client.authorSender(message, "Zostałeś zbanowany z serwera!", "Przykro nam!", "RED", [
        {
            name: "Serwer", value: message.guild.name
        },
        {
            name: "Użytkownik, który cię zbanował", value: message.author.tag
        },
        {
            name: "Czas", value: "♾️"
        }
    ])
}
exports.help = {
    name: "ban",
    aliases: ["zbanuj"],
    category: "moderation",
}