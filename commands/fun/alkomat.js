const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    let v = Math.floor(Math.random() * (10 - 0) + 0)

    client.sender(message, "", `${args[0]} posiada ${v} promili!`, "", "GREEN", "")
}
exports.help = {
    name: "alkomat",
    description: "Sprawdza poziom promili",
    category: "fun",
}