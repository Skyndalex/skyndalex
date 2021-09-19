const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageActionRow, MessageEmbed} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('jobs')
        .setDescription('Dołącz do pracy')
        .addStringOption(option => (
            option.setName("job").setDescription("Dołącz do pracy. Wpisz samą komendę aby zobaczyć listę prac.")
                .addChoice("programista", "developer")
                .addChoice("górnik", "miner")
        )),
    async execute(client, interaction) {
        if (interaction.options.getString("job") === "developer") {
            interaction.reply({content: 'siema'})
        } else if (interaction.options.getString("job") === "miner") {
            interaction.reply({content: "siema2"})
        }
    }

};
