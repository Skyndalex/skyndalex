const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('przytul')
        .setDescription('Przytul użytkownika')
        .addUserOption(option => (
            option.setName("kogo").setDescription("Kogo chcesz przytulić?").setRequired(true)
        )),

    async execute(client, interaction) {
        if (interaction.options.getUser("kogo")) {
            const target = interaction.options.getUser("kogo");

            interaction.reply({content: `Nie płacz, <@${target.id}>! I tak będziesz mieszkać w polsce\n\n*Obcykał cię <@${interaction.user.id}>*`})
        }
    }
};
