const r = require("rethinkdb")
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_ROLES')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_ROLES\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "Brak argumentów.", "Nie podano użytkownika!", "", "GREEN", "", "", "")

    const user = client.users.cache.get(args[0]) || message.mentions.users.first()

    if (!message.guild.owner.id === user.id) return client.sender(message, "Błąd!", "Nie możesz ostrzec właściciela!", "", "GREEN", "", "", "")

    const warnArgs = args.join(" ")

    client.sender(message, "Nadano ostrzeżenie!", "UWAGA! Dodawanie ostrzeżeń do bazy zostanie dodane wkrótce.", client.moderationFooter, "RED", [
        {
            name: "Powód",
            value: warnArgs||"Brak"
        },
        {
            name: "Użytkownik",
            value: user.tag
        },
        {
            name: "Ostrzeżenia",
            value: "soon:tm:"
        }
    ])
    client.authorSender(message, "Dostałeś ostrzeżenie!", "UWAGA! Na ten czas ostrzeżenia nie zapisują się do bazy danych.", client.moderationFooter, "RED", [
        {
            name: "Przez",
            value: message.author.tag
        },
        {
            name: "Powód",
            value: warnArgs||"Brak"
        }
    ])
}
exports.help = {
    name: "warn",
    aliases: ["ostrzez"],
    category: "moderation",
}