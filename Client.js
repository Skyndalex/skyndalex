const { Client, MessageEmbed } = require("discord.js")

class KriveManager extends Client {

    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v4.1"
        this.site = "krivebot.xyz"
        this.invite = "krivebot.xyz/invite"
        this.discord = "krivebot.xyz/discord"
    }
    sender (message, title, text, footer, color, fields = [], image) { // nice spaghetti good to eat :O
        const senderEmbed = new MessageEmbed()
            if (title) senderEmbed.setTitle(title)
            if (text) senderEmbed.setDescription(text)
            if (color) senderEmbed.setColor(color)
            if (footer) senderEmbed.setFooter(footer)
            if (image) senderEmbed.setImage(image)
            if (fields.length) senderEmbed.addFields(fields);
        return message.reply({embeds: [senderEmbed], allowedMentions: {parse: []}})
    }
}
module.exports = KriveManager;