const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Napisz pytanie!`);

    let reponses = [
        "Tak",
        "Nie",
        "Chyba tak",
        "Chyba nie"
    ]

    const embed = new Discord.MessageEmbed()
        .addField('Twoje pytanie', args.join(' '))
        .addField('Odpowiedź', reponses.random())
        .setColor('GREEN')

    message.channel.send(embed);
};

exports.help = {
    name: "8ball",
    description: "Magiczna kula!",
    category: "fun"
}