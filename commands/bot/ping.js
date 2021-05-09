const Discord = require("discord.js")

exports.run = (client, message) => {
   let embed = new Discord.MessageEmbed()
       .setDescription(`Ping: ${client.ws.ping}`)
       .setColor("GREEN")
    message.channel.send(embed)

    client.sender(message, "", `Ping: ${client.ws.ping}ms`, "", "GREEN", "", "")
};

exports.help = {
    name: "ping",
    description: "Ping bota",
    category: "bot",
}