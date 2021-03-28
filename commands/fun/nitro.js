const Discord = require('discord.js-light')
exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Podaj nazwę emoji`)
    let emoji = client.emojis.cache.find(x => x.name === args[0])
    if (!emoji) return client.error(message, `Nie znalazłem tego emoji (musisz wpisać NAZWĘ bez dwukropek.)`)
    message.channel.send(emoji.toString())
};

exports.help = {
    name: "nitro",
    description: "nitro",
    category: "fun"
}