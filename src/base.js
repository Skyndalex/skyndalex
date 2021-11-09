const { Client, MessageEmbed } = require("discord.js")

class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v4.7"
        this.adminIDs = ["817883855310684180"]
    }

    builder (interaction, title, text, footer, color, fields = [], image, ephemeral = false) {
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(title)
            .setDescription(text)
            .setColor(color)
            .setFooter(footer)
            .setImage(image)
            .addFields(fields)
        return interaction.reply({ embeds: [embed], allowedMentions: {parse: []}, ephemeral: ephemeral});
    }
}
module.exports = Base;