const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.manage_messages.warn\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")
    
    const user = message.mentions.users.first()  || client.users.cache.get(args[1]) || message.author;
    if (!user) return client.sender(message, "Błąd!", "Nie podałeś użytkownika!", "", "RED", "", "")

    const warn = args.join(" ").slice(0)
    const id = (Math.floor(Math.random() * (85 - 0)))

    await r.table("moderation").insert({userid: user.id, warn: warn, id: id}).run(client.con)
    message.channel.send(`Nadano ostrzeżenie dla ${user.tag}`)
};

exports.help = {
    name: "warn",
    description: "Ostrzega użytkownika",
    category: "moderation",
    aliases: ["w"]
}