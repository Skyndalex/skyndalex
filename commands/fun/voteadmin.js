const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Podaj argumenty!`)

    message.react('👍')
    message.react('👎')
}
exports.help = {
    name: "voteadmin",
    description: "voteadmin",
    category: "fun",
}