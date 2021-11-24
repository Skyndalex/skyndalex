const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test2")
        .setDescription("hhhh2"),

    async execute(client, interaction) {
       // let string = client.strings.tools.set.embed_successfully;
    }
};