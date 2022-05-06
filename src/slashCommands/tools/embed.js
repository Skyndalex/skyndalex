const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Embed builder"),
    async execute(client, interaction) {
        require("../../modals/embeds/embed").run(client, interaction)
    }
}