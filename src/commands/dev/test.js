const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
    name: "test",
    description: "test",

    run: async (client, interaction) => {
        let dev = ["817883855310684180"];
        if (!dev.includes(interaction.user.id)) return interaction.reply(client.strings.dev.error_permissions);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('test-1')
                    .setLabel('Test button')
                    .setStyle('PRIMARY'),
            );

        await interaction.reply({ content: "Hello world!", components: [row] });
    }
}