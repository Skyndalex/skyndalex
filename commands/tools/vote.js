const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Wyślij głosowanie.'),

    async execute(client, interaction) {
    }
};