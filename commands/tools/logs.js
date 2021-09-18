// @formatter: off
const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Ustawienia logów.'),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});

        client.builder(interaction, "", "**Błąd!**\n\nNic nie podano! Wybierz coś z opcji (/).", "Logi", "RED", "", "")
    }
};