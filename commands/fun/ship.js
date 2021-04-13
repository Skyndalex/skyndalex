const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    let percent = Math.floor(Math.random() * (100 - 0) + 0)

    if (!args[0]) return client.error(message, `Nie podano argumentu!`)
    if (!args[1]) return client.error(message, `Nie podano 2 argumentu!`)

    const embed = new Discord.MessageEmbed()
        .setDescription(`${args[0]} oraz ${args[1]} kochaja się na ${percent}%`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "ship",
    description: "Sprawdza, jak ktoś bardzo się kocha. Najprzydatniejsza komenda w bocie!",
    category: "fun",
}