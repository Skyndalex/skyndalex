const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!args[0]) return client.error(message, "Nie podano")
    const embed = new Discord.MessageEmbed()
        .setDescription(`${message.author.tag} zabił ${args[0]}! Spoczywaj w pokoju :(`)
        .setColor("GREEN")
    message.channel.send(embed)
};

exports.help = {
    name: "kill",
    description: "no",
    category: "fun"
}