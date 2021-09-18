// @formatter: off
// todo: objects
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageActionRow, MessageEmbed} = require("discord.js");
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Tickety'),

    async execute(client, interaction) {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('createticket')
                        .setLabel('Utwórz ticket')
                        .setEmoji("✉")
                        .setStyle('SUCCESS'),
                );
            const embed = new MessageEmbed()
                .setDescription("**Utwórz ticket**\n\nAby otworzyć ticket, naciśnij przycisk \`Utwórz ticket\`.")
                .setColor("GREEN")

            await interaction.reply({
                embeds: [embed],
                components: [row]
            })
    }
};