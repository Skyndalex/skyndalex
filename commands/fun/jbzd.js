const fetch = require("node-fetch")
const Discord = require("discord.js-light")
exports.run = async (client, message) => {
    const channel = message.channel
    if (!channel.nsfw) return client.error(message, `Ten kanał musi być NSFW `)
    fetch("https://cenzurabot.pl/api/memes/jbzd")
        .then(resp => resp.json())
        .then(resp => {
            let embed = new Discord.MessageEmbed()
                .setTitle("Wygenerowano jbzd!")
                .setImage(resp.meme)
                .setFooter("Wygenerowano za pomocą API https://cenzurabot.pl/api/memes/jbzd")
                .setColor("GREEN")
            message.channel.send(embed)
        })
}
exports.help = {
    name: "jbzd",
    description: "Generuje obrazek z strony jbzd",
    category: "fun",
}