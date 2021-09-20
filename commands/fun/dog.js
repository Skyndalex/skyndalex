const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Generuje psa.'),

    async execute(client, interaction) {

    }
};
