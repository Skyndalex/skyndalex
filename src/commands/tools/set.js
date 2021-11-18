const r = require("rethinkdb")
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "set",
    description: "Bot settings.",
    options: [
        { type: "CHANNEL", name: "broadcast_channel", description: "Broadcast channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "suggestions_channel", description: "Suggestions channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "complaints_channel", description: "Complaints channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "images_channel", description: "Images channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "welcome_channel", description: "Welcome channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "goodbye_channel", description: "Goodbye channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "applications_channel", description: "Applications channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "moderator_role", description: "Server moderator role [Required for tickets]", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "muted_role", description: "The role of the muted user"},
        { type: "CHANNEL", name: "user_role", description: "User role [Required for verification]", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "auto_role", description: "If a user enters the server, they will automatically get the role set.", channelTypes: ["GUILD_TEXT"]},
    ],

    run: async (client, interaction) => {
            for (let option of interaction.options.data) {
                switch (option.name) {
                    case "broadcast":
                        /*
                        The default builder for embeds is added here temporarily.
                        I will change it if I rewrite the current one from the base.js file (in root folder)
                         */

                        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You have no permissions: \`MANAGE_CHANNELS'`", ephemeral: true});
                        if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.reply({content: "I have no permissions: \`MANAGE_CHANNELS\`"});

                        const channel = await interaction.options.getChannel("broadcast");

                        await r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: channel.id}).run(client.con);
                        await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, broadcastChannel: channel.id }).run(client.con);

                        const embedBroadcast = new MessageEmbed()
                            .setTitle("Successfully set!")
                            .setDescription(`Selected option: \`${option.name}\``)
                            .addField(`New value`, `<#${channel.id}>`)
                            .setColor("DARK_BUT_NOT_BLACK")
                        interaction.reply({ embeds: [embedBroadcast] })
                        break;
                }
            }
    }
}