const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Statystyki bota'),

    async execute(client, interaction) {
        const embed = new MessageEmbed()
            .addField(`\`Cache:\``, `Serwery: ${client.guilds.cache.size}\nUżytkownicy: ${client.users.cache.size}\nKanały: ${client.channels.cache.size}\nEmoji: ${client.emojis.cache.size}`)
            .setColor("GREEN")
        interaction.reply({embeds: [embed]})
    }
};
