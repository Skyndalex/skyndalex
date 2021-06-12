const discord = require("discord.js");
const client = new discord.Client()
exports.run = async (client, message, args) => {
    let dev = ["817883855310684180"];
    if (!dev.includes(message.author.id)) return message.channel.send("Niedostępne dla uzytkowników!")
}
exports.help = {
    name: "sc",
    aliases: ["sc"],
    category: "developers",
}