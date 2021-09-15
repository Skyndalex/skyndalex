const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pytanie')
        .setDescription('Zadaj pytanie botowi.')
        .addStringOption(option => (
            option.setName("question").setDescription("Podaj tekst, na który mam odpowiedzieć.").setRequired(true)
        )),

    async execute(client, interaction) {
        if (interaction.options.getString("question")) {
            const que = interaction.options.getString("question");

            let randomMessages = ["Tak", "Nie", "Nie jestem w stanie na to odpowiedzieć.", "Jasne!", "Oczywiście!", "Nein", "不", "是的"]

            client.builder(interaction, `Odpowiedź na pytanie`, `Twoje pytanie: ${que}\nOdpowiedź: ${randomMessages.random()}`, `8ball`, `GREEN`, ``)
        }
    }
};
