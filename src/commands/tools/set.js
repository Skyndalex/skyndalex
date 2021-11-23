const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb")
module.exports = {
    data: {
        name: "set",
        description: "Bot settings.",
        options: [
            { type: 7, name: "broadcast-channel", description: "Broadcast channel" },
            { type: 7, name: "suggestions-channel", description: "Suggestions channel" },
            { type: 7, name: "complaints-channel", description: "Complaints channel" },
            { type: 7, name: "images-channel", description: "Images channel" },
            { type: 7, name: "welcome-channel", description: "Welcome channel" },
            { type: 7, name: "goodbye-channel", description: "Goodbye channel" },
            { type: 7, name: "applications-channel", description: "Applications channel" },
            { type: 8, name: "moderator-role", description: "Server moderator role [Required for tickets]" },
            { type: 8, name: "muted-role", description: "The role of the muted user" },
            { type: 8, name: "user-role", description: "User role [Required for verification]" },
            { type: 8, name: "auto-role", description: "If a user enters the server, they will automatically get the role set." },
    ],
},

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You need permissions: \`MANAGE_CHANNELS\`"});

        for (let option of interaction.options.data) {
            switch (option.name) {
                case "broadcast-channel":
                    const channel = await interaction.options.getChannel("broadcast-channel");

                    if (channel.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel_suggestions.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: channel.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ broadcastChannel: channel.id }).run(client.con)

                    const embed_Broadcast = new MessageEmbed()
                        .setTitle("Successfully set!")
                        .setDescription(`Selected option: \`${option.name}\``)
                        .addField(`New value`, `<#${channel.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Broadcast] })
                    break;
                case "suggestions-channel":
                    const channel_suggestions = await interaction.options.getChannel("suggestions-channel");

                    if (channel_suggestions.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, suggestionsChannel: channel_suggestions.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ suggestionsChannel: channel_suggestions.id }).run(client.con)

                    const embed_Suggestions = new MessageEmbed()
                        .setTitle("Successfully set!")
                        .setDescription(`Selected option: \`${option.name}\``)
                        .addField(`New value`, `<#${channel_suggestions.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Suggestions] })
                    break;
                case "vote-channel":
                    break;
                }
            }
        }
};