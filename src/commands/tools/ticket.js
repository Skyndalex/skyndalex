const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("tickets")
        .setDescription("Tickets menu")
        .addSubcommand(subcommand =>
            subcommand
                .setName("enable")
                .setDescription("Enable tickets"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("disable")
                .setDescription("Disable tickets"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("send")
                .setDescription("send ticket"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("adduser")
                .setDescription("Add user to ticket")
                .addUserOption(option => option.setName("target").setDescription("Target user")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("removeuser")
                .setDescription("Remove user from ticket")
                .addUserOption(option => option.setName("target").setDescription("Target user"))),
    async execute(client, interaction) {
        interaction.reply('co to jest');
        console.log(client.strings.tickets.ENABLED_SUCCESS)
    },
};
