const { SlashCommandBuilder } = require('@discordjs/builders');
const { fetch } = require("undici");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command"),
    async execute(client, interaction) {

    }
}