const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Settings")
        .addChannelOption(option =>
            option.setName("broadcast-channel").setDescription("Broadcast channel."))
        .addChannelOption(option =>
            option.setName("suggestions-channel").setDescription("Suggestions channel"))
        .addChannelOption(option =>
            option.setName("vote-channel").setDescription("Voting channel"))
        .addChannelOption(option =>
            option.setName("complaint-channel").setDescription("Complaint channel"))
        .addChannelOption(option =>
            option.setName("image-channel").setDescription("Images channel"))
        .addChannelOption(option =>
            option.setName("application-channel").setDescription("Applications channel")),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You need permissions: \`MANAGE_CHANNELS\`"});

        for (let option of interaction.options.data) {
            switch (option.name) {
                // Algorithms needs rewrite. I know it.
                case "broadcast-channel":
                    const channel = await interaction.options.getChannel("broadcast_channel");

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