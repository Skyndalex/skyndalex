const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb");
const cooldown = new Set;
module.exports = {
    name: "interactionCreate",
    once: true,

    async execute (client, interaction) {

            const cmd = client.slashCommands.get(interaction.commandName);
            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            if (cmd) cmd.run(client, interaction).catch(error => {
                let errorEmbedChannel = new MessageEmbed()
                    .setDescription(`Server ID: ${interaction.guild.id} (${interaction.guild.name})\nError:\n\`\`\`${error || "None"}\`\`\``)
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setTimestamp()
                if (error) client.channels.cache.get("914250038744604672").send({embeds: [errorEmbedChannel]})

                let errorEmbed = new MessageEmbed()
                    .setDescription(`An error has occurred! View [Documentation](https://docs.krivebot.xyz)\nOr [Required bot permissions](https://docs.krivebot.xyz/permissions)\nError:\n\`\`\`${error || "None."}\`\`\`\n\n[Contact with the bot administration](https://krivebot.xyz/discord)\n[Statuspage](https://status.krivebot.xyz)`)
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setTimestamp()
                interaction.reply({embeds: [errorEmbed]})
            });


        /*
        if (interaction.isContextMenu()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (command) command.run(client, interaction);
        }
        */

        // Buttons

        switch (interaction.customId) {
            case "ticket_open":
                if (cooldown.has(interaction.user.id)) {
                    interaction.reply({ content: "Please wait one minute before clicking the button again", ephemeral: true })
                } else {
                    const channel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
                        type: "GUILD_TEXT",
                        permissionOverwrites: [
                            { id: interaction.user.id, allow: [ "SEND_MESSAGES", "VIEW_CHANNEL" ] },
                            { id: interaction.guild.id, deny: [ "VIEW_CHANNEL" ] }
                        ]
                    })
                    const embedCreate = new MessageEmbed()
                        .setTitle(`Opened ticket!`)
                        .setDescription(`-> <#${channel.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    await interaction.reply({ embeds: [embedCreate], ephemeral: true })
                }
                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, 60000);
                break;
        }
    }
}