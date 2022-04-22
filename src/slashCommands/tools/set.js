/*
module.exports = {
    name: "set",
    description: "Bot settings. Data should be completed one by one from the list of options.",
    options: [
        { name: "channels", description: "Data should be completed one by one from the list of options", type: 1, options: [
                { type: "CHANNEL", name: "broadcast-channel", description: "Broadcast channel" },
                { type: "CHANNEL", name: "suggestions-channel", description: "Suggestions channel" },
                { type: "CHANNEL", name: "complaints-channel", description: "Complaints channel" },
                { type: "CHANNEL", name: "images-channel", description: "Images channel" },
                { type: "CHANNEL", name: "welcome-channel", description: "Welcome channel" },
                { type: "CHANNEL", name: "goodbye-channel", description: "Goodbye channel" },
                { type: "CHANNEL", name: "applications-channel", description: "Applications channel" },
                { type: "CHANNEL", name: "vote-channel", description: "Voting channel" },
                { type: "CHANNEL", name: "mod-log", description: "Mod log channel " },
            ]},
        { name: "roles", description: "Data should be completed one by one from the list of options", type: 1, options: [
                { type: "ROLE", name: "moderator-role", description: "Server moderator role [Required for tickets]" },
                { type: "ROLE", name: "muted-role", description: "The role of the muted user" },
                { type: "ROLE", name: "user-role", description: "User role [Required for lock, unlock commands]" },
                { type: "ROLE", name: "auto-role", description: "If a user enters the server, they will automatically get the role set." },
            ]}
    ],
 */
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