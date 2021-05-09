const Discord = require("discord.js")
const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    fetch('https://some-random-api.ml/img/dog')
        .then(res => res.json())
        .then(res => {
            client.sender(message, "Wygenerowano", "", "", "GREEN", "", res.link)
        })
};
exports.help = {
    name: "dog",
    description: "Generuje słodkiego pieska",
    category: "fun"
}