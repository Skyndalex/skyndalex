
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const os = require("os"); // default
const osu = require("node-os-utils")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Statystyki bota'),

    async execute(client, interaction) {
        const rss = `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`;
        const cpu = osu.cpu

        const cpuInfo = cpu.usage().then(async info => {
            const embed = new MessageEmbed()
                .setTitle(`Statystyki bota`)
                .setDescription(`\`Czas działania bota: ${require("moment").duration(client.uptime).humanize().toString()}\``)
                .addField(`Liczba serwerów`, client.guilds.cache.size.toString())
                .addField(`Liczba użytkowników`, client.users.cache.size.toString())
                .addField(`Liczba kanałów`, client.channels.cache.size.toString())
                .addField(`Liczba emoji`, client.emojis.cache.size.toString())
                .addField(`Zużycie CPU`, `${info}%`.toString())
                .addField(`Zużycie pamięci RAM (rss)`, rss.toString())
                .setColor("DARK_NAVY")
            await interaction.reply({ embeds: [embed] })
        })
    }
};