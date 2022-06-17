const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const osu = require('node-os-utils')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Info command"),

    async execute(client, interaction) {

        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("details_stats_button")
                    .setLabel("Details")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setCustomId("info_bug_submit")
                    .setLabel("Report bug")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setCustomId("info_suggest_submit")
                    .setLabel("Send suggestion")
                    .setStyle("SUCCESS")
            )
        let links = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Documentation")
                    .setStyle("LINK")
                    .setURL("https://docs.skyndalex.xyz")
                    .setDisabled(true),
                new MessageButton()
                    .setLabel("Site")
                    .setStyle("LINK")
                    .setURL("https://skyndalex.xyz"),
                new MessageButton()
                    .setLabel("Status")
                    .setStyle("LINK")
                    .setURL("https://status.skyndalex.xyz"),
            )
        let embed = new MessageEmbed()
            .setTitle("Bot info")
            .addField("\`Cache\`", `Guilds: ${client.guilds.cache.size}\nUsers: ${client.users.cache.size}\nChannels: ${client.channels.cache.size}\nEmojis: ${client.emojis.cache.size}`)
        await interaction.reply({ embeds: [embed], components: [row, links] })
    }
}