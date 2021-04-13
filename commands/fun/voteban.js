const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Podaj argumenty!`)

    message.react('👍')
    message.react('👎')
}
exports.help = {
    name: "voteban",
    description: "voteban",
    category: "fun",
}