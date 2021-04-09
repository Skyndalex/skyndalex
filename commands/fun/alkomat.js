const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
    let v = Math.floor(Math.random() * (10 - 0) + 0)

    if (!args[0]) return client.error(message, `Nie podano argumentu!`)

    const embed = new Discord.MessageEmbed()
        .setDescription(`${args[0]} posiada ${v} promili!`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "alkomat",
    description: "Sprawdza poziom promili",
    category: "fun",
}