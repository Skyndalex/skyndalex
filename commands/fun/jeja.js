const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jeja')
        .setDescription('Generuje śmieszny mem z jeja.pl'),

    async execute(client, interaction) {

    }
};
