const Discord = require("discord.js-light")
exports.run = async (client, message) => {
   let embed = new Discord.MessageEmbed()
       .setDescription(`Ping: ${client.ws.ping}`)
       .setColor("GREEN")
    message.channel.send(embed)
};

exports.help = {
    name: "ping",
    description: "Ping bota",
    category: "bot",
}