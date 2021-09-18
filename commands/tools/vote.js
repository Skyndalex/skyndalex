const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Wyślij głosowanie.'),

    async execute(client, interaction) {
    }
};