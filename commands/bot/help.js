const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const os = require("os");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pomoc')
        .setDescription('Lista komend'),

    async execute(client, interaction) {
        client.builder(interaction, "", "**Lista komend**\n\nListę komend znajdziesz w slash-komendach [/komenda].", "Komendy", "GREEN", "", "https://i.imgur.com/2f58Twn.png")
    }
};
