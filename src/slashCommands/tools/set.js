
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Settings")
        .addSubcommand(subcommand =>
            subcommand
                .setName("channels")
                .setDescription("Channels settings")
                .addChannelOption(option =>
                    option.setName("broadcastchannel").setDescription("Broadcast channel").setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName("suggestionschannel").setDescription("Suggestions channel").setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName("complaintschannel").setDescription("Complaint channel").setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName("imageschannel").setDescription("Images channel").setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName("welcomechannel").setDescription("Welcome channel").setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName("goodbyechannel").setDescription("Goodbye channel").setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName("applicationschannel").setDescription("Applications channel").setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName("modlog").setDescription("Modlog channel").setRequired(true)
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("roles")
                .setDescription("Roles settings")
                .addRoleOption(option =>
                    option.setName("moderator").setDescription("Moderator role").setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName("muted").setDescription("Muted role").setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName("user").setDescription("User role").setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName("auto").setDescription("Auto role").setRequired(true)
                )
        ),
    async execute(client, interaction) {

    }
}