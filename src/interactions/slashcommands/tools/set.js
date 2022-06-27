
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
        const data = interaction.options._hoistedOptions.map(x => x.value)
        console.log(data)

        // There were problems with the switch(data) [...]. Definitely better to use ifs. I know it doesn't look interesting.
        //
        if (data[0]) await r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: data[0]}, { conflict: "update" }).run(client.con)
        if (data[1]) await r.table("settings").insert({ id: interaction.guild.id, suggestionsChannel: data[1]}, { conflict: "update" }).run(client.con);
        if (data[2]) await r.table("settings").insert({ id: interaction.guild.id, complaintsChannel: data[2]}, { conflict: "update" }).run(client.con);
        if (data[3]) await r.table("settings").insert({ id: interaction.guild.id, imagesChannel: data[3]}, { conflict: "update" }).run(client.con);
        if (data[4]) await r.table("settings").insert({ id: interaction.guild.id, welcomeChannel: data[4]}, { conflict: "update" }).run(client.con);
        if (data[5]) await r.table("settings").insert({ id: interaction.guild.id, goodbyeChannel: data[5]}, { conflict: "update" }).run(client.con);
        if (data[6]) await r.table("settings").insert({ id: interaction.guild.id, modLogChannel: data[6]}, { conflict: "update" }).run(client.con);

    }
}