const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    let percent = Math.floor(Math.random() * (100 - 0) + 0)

    if (!args[0]) return client.sender(message, "401: No content", "Nie podano **1** argumentu!", client.footer, "RED", "", "")
    if (!args[1]) return client.sender(message, "401: No content", "Nie podano **2** argumentu!", client.footer, "RED", "", "")

    client.sender(message, "", `${args[0]} oraz ${args[1]} kochają się na ${percent}%!`, "", "GREEN", "", "")

}
exports.help = {
    name: "ship",
    description: "Sprawdza, jak ktoś bardzo się kocha. Najprzydatniejsza komenda w bocie!",
    category: "fun",
}