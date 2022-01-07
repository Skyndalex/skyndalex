const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
module.exports = {
    name: "ticket",
    description: "Create guild ticket.",

    run: async (client, interaction) => {
        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.moderatorRole) return interaction.reply(`There is no moderator role set on this server! Please configure the role using the \`set\` command.`);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticket_open')
                    .setLabel('Open ticket')
                    .setStyle('SUCCESS'),
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