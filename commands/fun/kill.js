const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!args[0]) return client.error(message, "Nie podano")

    client.sender(message, "", `${message.author.tag} zabił ${args[0]}! Spoczywaj w pokoju :(`, "", "GREEN", "", "")
};

exports.help = {
    name: "kill",
    description: "no",
    category: "fun"
}