const fetch = require("node-fetch")
const Discord = require("discord.js-light")
exports.run = async (client, message) => {
    message.channel.send("Generuję... Może to trochę potrwać.")
    fetch("https://cenzurabot.pl/api/memes/kwejk")
        .then(resp => resp.json())
        .then(resp => {
            const embed = new Discord.MessageEmbed()
                .setTitle("Wygenerowano mema!")
                .setImage(resp.meme)
                .setFooter("Wygenerowano za pomocą API https://cenzurabot.pl/api/memes/kwejk")
                .setColor("GREEN")
            message.channel.send(embed)
        })
}
exports.help = {
    name: "meme",
    description: "Generuje obrazek z memem",
    category: "fun",
}