const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, version } = require("discord.js");
const os = require("os");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Statystyki bota'),

    async execute(client, interaction) {
        let rss = `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`;

        const embed = new MessageEmbed()
            .addField(`\`Cache:\``, `Serwery: ${client.guilds.cache.size}\nUżytkownicy: ${client.users.cache.size}\nKanały: ${client.channels.cache.size}\nEmoji: ${client.emojis.cache.size}`)
            .addField(`\`Zasoby:\``, `${rss}`)
            .addField(`\`Dane:\``, `Wersja bota: ${client.version}\nDiscord.js: ${version}\nNode.js: ${process.version}\nUptime: ${require("moment").duration(client.uptime).humanize()}`)
            .setColor("GREEN")
        interaction.reply({embeds: [embed]});
    }
};
