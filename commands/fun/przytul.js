const Discord = require("discord.js")
exports.run = (client, message, args) => {
    const user = message.mentions.users.first()||client.users.cache.get(args[0])
    if (!user) return client.error(message, "Nie znaleziono uzytkownika!")

}
exports.help = {
    name: "przytul",
    description: "Przytula użytkownika",
    category: "fun",
}