const Discord = require("discord.js-light")
const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    fetch('https://some-random-api.ml/img/dog')
        .then(res => res.json())
        .then(res => {
            const embed = new Discord.MessageEmbed()
                .setTitle("Wygenerowano")
                .setImage(res.link)
                .setColor("GREEN")
            message.channel.send(embed);
        })
};
exports.help = {
    name: "dog",
    description: "Generuje słodkiego pieska",
    category: "fun"
}