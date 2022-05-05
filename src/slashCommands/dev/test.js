const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command")
        .setDefaultPermission(false),

    async execute(client, interaction) {
    }
}