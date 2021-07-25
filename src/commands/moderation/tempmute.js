const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_ROLES\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "204: No content", "Nie podano użytkownika!", client.footer, "RED", "", "")

    const role = await r.table("settings").get(message.guild.id)("mutedRole").run(client.con)

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return client.sender(message, "404: Not found", "Nie znaleziono użytkownika!", client.footer, "RED", "", "")

    if (member.id === message.author.id) return  client.sender(message, "405: Method Not Allowed", "Niedozwolona metoda! Nie możesz wyciszyć samego siebie!", client.footer, "RED", "", "")

    if (member.id === message.author.id) return  client.sender(message, "405: Method Not Allowed", "Niedozwolona metoda! Nie możesz wyciszyć samego siebie!", client.footer, "RED", "", "")
    if (member.id === message.guild.ownerID) return  client.sender(message, "405: Method Not Allowed", "Niedozwolona metoda! Nie możesz uciszyć właściciela serwera!!", client.footer, "RED", "", "")
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return  client.sender(message, "405: Method Not Allowed", "Nie możesz uciszyć użytkownika z taką samą lub wyższą rolą!!", client.footer, "RED", "", "")

    const time = args[1]
    if (!time) return message.channel.send("Nie podano czasu! [UWAGA! CZAS PODAJEMY TYLKO W SEKUNDACH BEZ LITEREK: s,h,m itp.")

    await member.roles.add(role)

    client.sender(message, "Uciszono użytkownika!", "", client.moderationFooter, "RED", [
        {
            name: "Serwer", value: message.guild.name
        },
        {
            name: "Moderator", value: message.author.tag
        },
        {
            name: "Użytkownik", value: member.user.tag
        },
        {
            name: "Wyciszono na", value: `${time} sekund`
        }
    ]) 

    setTimeout(async() => {
        await member.roles.remove(role)

        client.sender(message, "Usunięcie wyciszenia [AUTO]!", `Automatyczne usunięcie wyciszenia`, "", "GREEN", [
            {
                name: "> Użytkownik",
                value: member.user.tag
            },
            {
                name: "> Ustawiony czas",
                value: time + "sekund"
            },
            {
                name: "> Moderator",
                value: message.author.tag
            }
        ])
    }, 1000 * time)
}

exports.help = {
    name: "tempmute",
    aliases: ["wycisztymczasowo"],
    category: "moderation",
}