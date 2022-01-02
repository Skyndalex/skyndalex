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
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});
        if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.reply({content: "Nie mam permisji do zarządzania kanałami!"})

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