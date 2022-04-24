const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
module.exports = {data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("sussssssssssssssssssssssssssssssssssssssssssss"), execute: async function (client, interaction) {
        let dev = ["817883855310684180"];
        if (!dev.includes(interaction.user.id)) return interaction.reply({
            content: client.strings.dev.NO_PERMISSION_INFO,
            allowedMentions: {parse: []}
        })
    }}