const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mem')
        .setDescription('Generuje śmieszny mem z memy.pl'),

    async execute(client, interaction) {

    }
};
