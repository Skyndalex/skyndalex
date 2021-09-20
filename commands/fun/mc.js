const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mc')
        .setDescription('Szukaj gracza z gry minecraft')
        .addStringOption(option => (
            option.setName("player").setDescription("Gracz minecrafta.").setRequired(true)
        )),

    async execute(client, interaction) {

    }
};
