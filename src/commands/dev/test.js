const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test ok'),
    async execute(client, interaction) {
        await interaction.reply({content: `Witaj świecie!`})
    }
};
