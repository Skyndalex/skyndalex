const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
/*
Soon normal rows builders :)
Discord.Js - https://discordjs.guide/interactions/buttons.html#building-and-sending-buttons
 */
module.exports = {
    name: "serverinfo",
    description: "server information",

    run: async (client, interaction) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('info-serverinfo')
                    .setLabel('Informations')
                    .setEmoji("ℹ️")
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId("info-stats")
                    .setLabel("Server statistics")
                    .setEmoji("📊")
                    .setStyle("PRIMARY"),
            );

        const embed = new MessageEmbed()
            .setTitle("View server information")
            .setDescription("to see information about the server, just click on the buttons")
            .setColor("DARK_BUT_NOT_BLACK")
        await interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
}