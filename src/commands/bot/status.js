const Discord = require("discord.js")
exports.run = (client, message, args) => {
    client.sender(message, "", "Link do statusu bota: [Kliknij](https://status.krivebot.xyz)", "", "GREEN", "", "")
}
exports.help = {
    name: "status",
    description: "Link do statusu bota",
    category: "bot",
}
