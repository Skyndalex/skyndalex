const { Client } = require("discord.js")
const Discord = require("discord.js")

class KriveManager extends Client {

    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v4.0 BETA p2"
    }

    sender (message, title, text, footer, color, fields = [], image) {
        const senderEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(text)
            .setColor(color)
            .setFooter(footer)
            .setImage(image)
        if (fields.length) senderEmbed.addFields(fields);
        return message.channel.send(senderEmbed)
    }
}
module.exports = KriveManager;