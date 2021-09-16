const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const os = require("os");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Statystyki bota'),

    async execute(client, interaction) {
        let rss = `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`;
        let heapTotal = `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`;

        const embed = new MessageEmbed()
            .addField(`\`Cache:\``, `Serwery: ${client.guilds.cache.size}\nUżytkownicy: ${client.users.cache.size}\nKanały: ${client.channels.cache.size}\nEmoji: ${client.emojis.cache.size}`)
            .addField(`\`Zasoby: (rss/heapTotal)\``, `${rss} / ${heapTotal}`)
            .setColor("GREEN")
        interaction.reply({embeds: [embed]});
    }
};
