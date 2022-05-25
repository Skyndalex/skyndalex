
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Settings")
        .addSubcommand(subcommand =>
            subcommand
                .setName("channels")
                .setDescription("Channels settings")
                .addChannelOption(option => option.setName("broadcastchannel").setDescription("Broadcast channel"))
                .addChannelOption(option => option.setName("suggestionschannel").setDescription("Suggestions channel"))
                .addChannelOption(option => option.setName("complaintschannel").setDescription("Complaint channel"))
                .addChannelOption(option => option.setName("imageschannel").setDescription("Images channel"))
                .addChannelOption(option => option.setName("welcomechannel").setDescription("Welcome channel"))
                .addChannelOption(option => option.setName("goodbyechannel").setDescription("Goodbye channel"))
                .addChannelOption(option => option.setName("applicationschannel").setDescription("Applications channel"))
                .addChannelOption(option => option.setName("modlog").setDescription("Modlog channel")),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("roles")
                .setDescription("Roles settings")
                .addRoleOption(option => option.setName("moderator").setDescription("Moderator role"))
                .addRoleOption(option => option.setName("muted").setDescription("Muted role"))
                .addRoleOption(option => option.setName("user").setDescription("User role"))
                .addRoleOption(option => option.setName("auto").setDescription("Auto role"))
        ),
    async execute(client, interaction) {
        /*
        const data = interaction.options._hoistedOptions.map(x => x.value)
        console.log(data)

        if (data[0]) r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: data[0]}, { conflict: "update" }).run(client.con)
        if (data[1]) r.table("settings").insert({ id: interaction.guild.id, suggestionsChannel: data[1]}, { conflict: "update" }).run(client.con)
         */

    }
}