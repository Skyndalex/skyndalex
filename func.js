const Discord = require("discord.js")
module.exports = (client) => {
    client.commandNotEnabled = (message, text) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("Komenda wyłączona!")
            .setDescription(`Z powodu: ${text.replace(client.token, '[token]')}`)
            .setColor("RED")
        return message.channel.send(embed)
    }
      Object.defineProperty(Array.prototype, "random", {
        value: function () {
            return this[Math.floor(Math.random() * this.length)];
        }
    });
}