const Discord = require('discord.js');
const figlet = require('figlet');

exports.run = async (client, message, args) => {
    let text = args.join('\n');
    if (!text) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

    figlet(text, function(err, data) {
        if (err) {
            return client.error(message, `\`\`\`${err}\`\`\``);
        }

        let embed = new Discord.MessageEmbed()
            .setTitle('Wygenerowano')
            .setDescription(`\`\`\`${data}\`\`\``)
            .setFooter(client.footer)
            .setColor('GREEN')

        message.channel.send(embed);
    })
};

exports.help = {
    name: "ascii",
    description: "Generuje tekst ascii",
    category: "fun"
}