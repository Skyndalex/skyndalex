const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kaczkoland')
        .setDescription('Szukaj gracza z serwera kaczkoland.pl')
        .addStringOption(option => (
            option.setName("player").setDescription("Gracz kaczkolandu.").setRequired(true)
        )),

    async execute(client, interaction) {

    }
};
