const Discord = require('discord.js');
const fetch = require('node-fetch')

exports.run = async (client, message, args) => {
    fetch('https://some-random-api.ml/img/koala')
        .then(res => res.json())
        .then(res => {
            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Wygenerowano")
                .setImage(res.link)
            message.channel.send(embed);
        })
};

exports.help = {
    name: "koala",
    description: "Generuje słodkiego koalę",
    category: "fun"
}