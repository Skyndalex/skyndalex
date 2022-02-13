const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test ok'),
    async execute(client, interaction) {
        await interaction.reply({content: `Witaj świecie!`})
    }

};
