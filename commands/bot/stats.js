
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, version } = require('discord.js');
const os = require("os"); // default
const osu = require("node-os-utils")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Statystyki bota'),

    async execute(client, interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('stats-select-menu')
                    .setPlaceholder('Zaznacz')
                    .addOptions([
                        {
                            label: 'Cache', description: 'Statystyki cache', value: 'cache_stats',
                        },
                        {
                            label: "Zasoby", description: "Statystyki zasobów", value: "vps_stats"
                        },
                        {
                            label: "Wersje", description: "Wersje modułów", value: "versions"
                        },
                    ]),
            );
        await interaction.reply({components: [row], content: "Wybierz podkategorię."})

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 120000});

        const cpu = osu.cpu

        //todo: move to interactionCreate.js
        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                if (i.values[0] === 'cache_stats') {
                    const embed = new MessageEmbed()
                        .setDescription(`**Statystyki cache**\n\nSerwery: ${client.guilds.cache.size}\nUżytkownicy: ${client.users.cache.size}\nKanały: ${client.channels.cache.size}\nLiczba emoji: ${client.emojis.cache.size}`)
                        .setColor("GREEN")
                    await i.reply({ embeds: [embed] })
                } else if (i.values[0] === "vps_stats") {
                    //todo: fix
                    const rss = `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`;

                    //todo: os
                    const cpuInfo = cpu.usage().then(info => {
                       const embed2 = new MessageEmbed()
                           .setDescription(`**Zasoby**\n\nZużycie CPU: \`${info}%\`\nZużycie pamięci RAM: \`${rss}\`\nUptime: \`${require("moment").duration(client.uptime).humanize()}\``)
                           .setColor("GREEN")
                        i.reply({ embeds: [embed2] })
                   })
                    console.log(cpuInfo)
                } else if (i.values[0] === "versions") {
                    //todo: builder (embed)
                    const embed3 = new MessageEmbed()
                        .setDescription("Wersje")
                        .addField(`#> \`discord.js\``, `^${version}`)
                        .addField(`#> \`Node.Js\``, `^${process.version}`)
                        .addField("#> \`vue\`", "^2.6.14")
                        .addField("#> \`figlet\`", "^1.5.2")
                        .addField("#> \`node-html-parser\`", "^4.1.5")
                        .addField("#> \`body-parser\`", "^1.19.0")
                        .setColor("GREEN")
                        i.reply({ embeds: [embed3] })
                }
            }
        });
    }
};
/*
let rss = `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`;

const embed = new MessageEmbed()
    .addField(`\`Cache:\``, `Serwery: ${client.guilds.cache.size}\nUżytkownicy: ${client.users.cache.size}\nKanały: ${client.channels.cache.size}\nEmoji: ${client.emojis.cache.size}`)
    .addField(`\`Zasoby:\``, `${rss}`)
    .addField(`\`Dane:\``, `Wersja bota: ${client.version}\nDiscord.js: ${version}\nNode.js: ${process.version}\nUptime: ${require("moment").duration(client.uptime).humanize()}`)
    .setColor("GREEN")
interaction.reply({embeds: [embed]});

 */
