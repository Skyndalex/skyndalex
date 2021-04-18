const fetch = require("node-fetch")
const Discord = require("discord.js")
exports.run = async (client, message) => {
    const fetch = require('node-fetch')
    const { parse } = require('node-html-parser')
    fetch('https://memy.jeja.pl/losowe')
        .then(res => res.text())
        .then(body => {
            const root = parse(body)
            const img = parse(root.querySelector('.ob-left-image').toString())
            const mem = img.querySelector('img').getAttribute('src')

            const embed = new Discord.MessageEmbed()
                .setImage(mem)
                .setColor("GREEN")
            message.channel.send(embed)
        })
}
exports.help = {
    name: "meme",
    description: "Generuje obrazek z memem",
    category: "fun",
}