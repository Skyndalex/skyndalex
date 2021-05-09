const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    //TODO: seconds, hours (module: ms)

    if (!message.member.hasPermission('MANAGE_ROLES')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_ROLES\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "204: No content", "Nie podano użytkownika!", client.footer, "RED", "", "")

    const role = await r.table("settings").get(message.guild.id)("mutedRole").run(client.con)
    if (!role) return client.sender(message, "404: Not found", "Nie ustawiono roli!", client.footer, "RED", "", "")

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return client.sender(message, "404: Not found", "Nie znaleziono użytkownika!", client.footer, "RED", "", "")

    if (member.id === message.author.id) return  client.sender(message, "405: Method Not Allowed", "Niedozwolona metoda! Nie możesz wyciszyć samego siebie!", client.footer, "RED", "", "")

    if (member.id === message.author.id) return  client.sender(message, "405: Method Not Allowed", "Niedozwolona metoda! Nie możesz wyciszyć samego siebie!", client.footer, "RED", "", "")
    if (member.id === message.guild.ownerID) return  client.sender(message, "405: Method Not Allowed", "Niedozwolona metoda! Nie możesz uciszyć właściciela serwera!!", client.footer, "RED", "", "")
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return  client.sender(message, "405: Method Not Allowed", "Nie możesz uciszyć użytkownika z taką samą lub wyższą rolą!!", client.footer, "RED", "", "")

    await member.roles.add(role)

    client.sender(message, "Uciszono użytkownika!", "", client.moderationFooter, "GREEN", [
        {
            name: "Serwer",
            value: message.guild.id
        },
        {
            name: "Moderator",
            value: message.author.tag
        },
        {
            name: "Użytkownik",
            value: member.user.tag
        },
        {
            name: "Wyciszono na",
            value: `${args[0]} sekund`
        }
    ])

    client.sender(message, "Testowane!", "Uwaga! Komenda **tempmute** jest nadal testowana i łatwo ją zepsuć (np. czas można podawać __tylko__ w sekundach). Bardzo prosimy o zgłaszanie błedów komendą request.", client.moderationFooter, "GREEN")

    setTimeout(async() => {
        await member.roles.remove(role)

        message.channel.send(`Usunięto wyciszenia dla ${member.user.tag} (AUTOMATIC)`)

    }, 1000 * args[1])
}

exports.help = {
    name: "tempmute",
    aliases: ["wycisztymczasowo"],
    category: "moderation",
}