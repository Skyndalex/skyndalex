const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
    let percent = Math.floor(Math.random() * (100 - 0) + 0)

    if (!args[0]) return client.error(message, `Nie podano argumentu!`)

    const embed = new Discord.MessageEmbed()
        .setDescription(`${args[0]} jest gejem na ${percent}%!`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "howgay",
    description: "Komenda sprawdzająca, jak bardzo ktoś nienawidzi PiS",
    category: "fun",
}