const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
module.exports = {
    name: "ticket",
    description: "Create guild ticket.",

    run: async (client, interaction) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticket_open')
                    .setLabel('Open ticket')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId("ticket_delete")
                    .setLabel("Delete (this message)")
                    .setStyle("DANGER")
            );
        const embed = new MessageEmbed()
            .setTitle(client.strings.tools.ticket.create_ticket_title)
            .setDescription(client.strings.tools.ticket.create_ticket_description)
            .setColor("DARK_BUT_NOT_BLACK")
        await interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
};