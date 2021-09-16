const { Client, MessageEmbed } = require("discord.js");

class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.tof = {
            true: "Tak",
            false: "Nie"
        };
        this.version = "v4.4";
        this.site = "https://krivebot.xyz";
    }
    builder (interaction, title, text, footer, color, fields = [], image) {
        const embed = new MessageEmbed()
            .setTimestamp()
            if (title) embed.setTitle(title)
            if (text) embed.setDescription(text)
            if (color) embed.setColor(color)
            if (footer) embed.setFooter(footer)
            if (image) embed.setImage(image)
            if (fields.length) embed.addFields(fields);
        return interaction.reply({ embeds: [embed], allowedMentions: {parse: []}})
    }
}
module.exports = Base;