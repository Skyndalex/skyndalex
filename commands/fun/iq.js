const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let iq = Math.floor(Math.random() * (100 - 0) + 0)

    if (!args[0]) return client.error(message, `Nie podano argumentu!`)

    const embed = new Discord.MessageEmbed()
        .setDescription(`${args[0]} posiada ${iq} iq!`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "iq",
    description: "Sprawdza, ile ktoś ma iq",
    category: "fun",
}