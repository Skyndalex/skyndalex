const { Client, MessageEmbed } = require('discord.js');
const r = require('rethinkdb');

class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.tof = {
            true: 'Tak',
            false: 'Nie',
        };
        this.version = 'v4.6';
        this.site = 'https://krivebot.xyz';
    }
    builder(interaction, title, text, footer, color, fields = [], image) {
        const embed = new MessageEmbed().setTimestamp();
        if (title) embed.setTitle(title);
        if (text) embed.setDescription(text);
        if (color) embed.setColor(color);
        if (footer) embed.setFooter(footer);
        if (image) embed.setImage(image);
        if (fields.length) embed.addFields(fields);
        return interaction.reply({
            embeds: [embed],
            allowedMentions: { parse: [] },
        });
    }
    ephemeral(interaction, title, text, footer, color, fields = [], image) {
        const embed2 = new MessageEmbed().setTimestamp();
        if (title) embed2.setTitle(title);
        if (text) embed2.setDescription(text);
        if (color) embed2.setColor(color);
        if (footer) embed2.setFooter(footer);
        if (image) embed2.setImage(image);
        if (fields.length) embed2.addFields(fields);
        return interaction.reply({
            embeds: [embed2],
            ephemeral: true,
        });
    }
}
module.exports = Base;
