const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Testowa komenda ping'),

    async execute(interaction) {
        interaction.reply({ content: 'Pong' })
    }
};
