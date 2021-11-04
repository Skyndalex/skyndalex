const { Client, MessageEmbed } = require("discord.js")
const strings = require("./strings.json")

class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v4.7"
        this.adminIDs = ["817883855310684180"]
        this.strings = strings
    }

    builder (interaction, title, text, footer, color, fields = [], image, ephemeral = false) {
        const embed = new MessageEmbed()
            .setTimestamp();
        if (title) embed.setTitle(title);
        if (text) embed.setDescription(text);
        if (color) embed.setColor(color);
        if (footer) embed.setFooter(footer);
        if (image) embed.setImage(image);
        if (fields.length) embed.addFields(fields);
        return interaction.reply({ embeds: [embed], allowedMentions: {parse: []}, ephemeral: ephemeral});
    }
}
module.exports = Base;