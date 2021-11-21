const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    devOnly: true,
    data: new SlashCommandBuilder()
        .setName("test2")
        .setDescription("hhhh2"),

    async execute(client, interaction) {
        console.log(module.exports.devOnly)
    }
};