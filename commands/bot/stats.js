const Discord = require("discord.js")
exports.run = (client, message) => {
    client.sender(message, ``, `**Statystyki**\n\n\`Wersje:\`\n\nDiscord.js: ${Discord.version}\nNode.JS: ${process.version}\nBot: ${client.version}\n\n\`Cache:\`\n\nLiczba serwerów: ${client.guilds.cache.size}\nLiczba użytkowników: ${client.users.cache.size}`, `Statystyki`, `GREEN`, ``)
}
exports.help = {
    name: "stats",
    usage: "stats",
    perms: "global.send_messages.stats",
    category: "bot",
    description: "Pokazuje statystyki bota",
}