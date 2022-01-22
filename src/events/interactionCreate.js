const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const cooldown = new Set;
module.exports = {
    name: "interactionCreate",
    once: true,

    async execute (client, interaction) {

            const cmd = client.slashCommands.get(interaction.commandName);
            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            //TODO: add client.debug to let

            if (client.debug === true && interaction.user.id!=="817883855310684180") return interaction.reply("You cannot use commands when debugging is enabled.")

            if (cmd) cmd.run(client, interaction).catch(error => {
                let errorEmbedChannel = new MessageEmbed()
                    .setDescription(`Server ID: ${interaction.guild.id} (${interaction.guild.name})\nCommand name: ${interaction.commandName}\nError:\n\`\`\`${error || "None"}\`\`\``)
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setTimestamp()
                if (error) client.channels.cache.get("914250038744604672").send({embeds: [errorEmbedChannel]})

                let errorEmbed = new MessageEmbed()
                    .setDescription(`An error has occurred!\nCommand name: ${interaction.commandName}\n\nView [Documentation](https://docs.krivebot.xyz)\nOr [Required bot permissions](https://docs.krivebot.xyz/permissions)\nError:\n\`\`\`${error || "None."}\`\`\`\n\n[Contact with the bot administration](https://krivebot.xyz/discord)\n[Statuspage](https://status.krivebot.xyz)`)
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setTimestamp()
                interaction.reply({embeds: [errorEmbed]})
            });

        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.moderatorRole) return;
        if (!data?.modlogChannel) return;

        switch (interaction.customId) {
            case "ticket_open":
                if (cooldown.has(interaction.user.id)) {
                    interaction.reply({ content: "Please wait one minute before clicking the button again", ephemeral: true });
                } else {
                    const channel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
                        type: "GUILD_TEXT",
                        permissionOverwrites: [
                            { id: interaction.user.id, allow: [ "SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"] },
                            { id: data?.moderatorRole, allow: [ "SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"] },
                            { id: client.user.id, allow: [ "SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"] },
                            { id: interaction.guild.id, deny: [ "VIEW_CHANNEL" ] }
                        ],
                    });

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('ticket_open_2')
                                .setLabel('Open ticket again')
                                .setStyle('PRIMARY'),
                            new MessageButton()
                                .setCustomId('ticket_close')
                                .setLabel('Close ticket')
                                .setStyle('DANGER'),
                            new MessageButton()
                                .setCustomId('ticket_delete')
                                .setLabel('Delete ticket')
                                .setStyle("DANGER")
                        );
                    const embed = new MessageEmbed()
                        .setTitle("Close ticket")
                        .setDescription("To close the ticket, click the button")
                        .setColor("YELLOW")
                    await channel.send({ embeds: [embed], components: [row] }).then(message => {
                        message.pin({ reason: "Pinned." })
                    })

                    const embedCreate = new MessageEmbed()
                        .setTitle(`Opened ticket!`)
                        .setDescription(`-> <#${channel.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    await interaction.reply({ embeds: [embedCreate], ephemeral: true })

                    const embedModlog = new MessageEmbed()
                        .setDescription(`Opened ticket by <@${interaction.user.id}> (${interaction.user.id}).\n\n-> <#${channel.id}>`)
                        .setColor("BLUE")
                        .setTimestamp()
                    await client.channels.cache.get(data?.modlogChannel).send({ embeds: [embedModlog] })
                };
                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, 60000);
                break;
            case "ticket_delete":
                await interaction.channel.delete();

                const embedModlog2 = new MessageEmbed()
                    .setDescription(`Deleted ticket by <@${interaction.user.id}> (${interaction.user.id}).`)
                    .setColor("RED")
                    .setTimestamp()
                await client.channels.cache.get(data?.modlogChannel).send({ embeds: [embedModlog2] })
                break;
            case "ticket_close":
                await interaction.channel.permissionOverwrites.edit(ticketUser, {
                    VIEW_CHANNEL: false,
                })

                const embedModlog3 = new MessageEmbed()
                    .setDescription(`Closed ticket by <@${user}> (${interaction.user.id})`)
                    .setColor("ORANGE")
                    .setTimestamp()
                await client.channels.cache.get(data?.modlogChannel).send({ embeds: [embedModlog3] })
                break;
            case "ticket_open2":
                await interaction.channel.permissionOverwrites.edit(ticketUser, {
                    VIEW_CHANNEL: true,
                })

                const embedModlog4 = new MessageEmbed()
                    .setDescription(`Opened ticket again by <@${interaction.user.id}> (${interaction.user.id}).`)
                    .setColor("GREEN")
                    .setTimestamp()
                await client.channels.cache.get(data?.modlogChannel).send({ embeds: [embedModlog4] })
                await interaction.channel.send({ embeds: [embedModLog4]} )
                break;
        }
    }
}