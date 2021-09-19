const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const r = require("rethinkdb");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Zweryfikuj się.'),

    async execute(client, interaction) {
        if (!interaction.guild.me.permissions.has("MANAGE_ROLES")) return interaction.reply({content: "Nie mam permisji do nadawania roli!"})

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('verify')
                    .setLabel('Zweryfikuj się')
                    .setStyle('SUCCESS'),
            );
        interaction.reply({
            content: "Zweryfikuj się.",
            components: [row],
        })
    }
};