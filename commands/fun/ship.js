const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
    let percent = Math.floor(Math.random() * (100 - 0) + 0)
    if (!args[0]) return client.errorBuilder(message, `Nie podano argumentu!`)
    let embed = new Discord.MessageEmbed()
        .setDescription(`${args[0]} jest gejem na ${percent}%!`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "ship",
    description: "Sprawdza, jak ktoś bardzo się kocha. Najprzydatniejsza komenda w bocie!",
    category: "fun",
}