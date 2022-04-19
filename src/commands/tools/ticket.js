const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("tickets")
        .setDescription("Tickets menu")
        .addSubcommand(subcommand =>
            subcommand
                .setName("enable")
                .setDescription("Enable tickets")
                .addStringOption(pingOption =>
                    pingOption.setName("pingmod").setDescription("Set pinging mods value to true/false")
                        .addChoice("true", "pingmod_true_value")
                        .addChoice("false", "pingmod_false_value"))
                .addStringOption(pingOption =>
                    pingOption.setName("pinguser").setDescription("Set pinging users value to true/false")
                        .addChoice("true", "pingmod_true_value")
                        .addChoice("false", "pingmod_false_value")))
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
                .setName("add")
                .setDescription("Add user to ticket")
                .addUserOption(option => option.setName("target").setDescription("Target user")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("Remove user from ticket")
                .addUserOption(option => option.setName("target").setDescription("Target user"))),
    async execute(client, interaction) {
        interaction.reply('co to jest');
    },
};
