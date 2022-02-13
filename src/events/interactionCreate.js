const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const r = require("rethinkdb")
const cooldown = new Set;
module.exports = {
    name: "interactionCreate",
    once: true,

    async execute (client, interaction) {
        switch (interaction.customId) {
            case "ticket_open":
                if (cooldown.has(interaction.user.id)) {
                    interaction.reply({ content: "Poczekaj minutę przed otwarciem następnego ticketa!", ephemeral: true });
                } else {
                    const data = await r.table("settings").get(interaction.guild.id).run(client.con);

                    const channel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
                        type: "GUILD_TEXT",
                        permissionOverwrites: [
                            { id: interaction.user.id, allow: [ "SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"] },
                            { id: data?.moderatorRole, allow: [ "SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"] },
                            { id: client.user.id, allow: [ "SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"] },
                            { id: interaction.guild.id, deny: [ "VIEW_CHANNEL" ] }
                        ],
                    });

                    await interaction.reply({ content: `Otworzyłeś ticket!\n\n-> <#${channel.id}>`, ephemeral: true })
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('ticket_close')
                                .setLabel('Zamknij ticket')
                                .setStyle('DANGER'),
                        );
                    const embed = new MessageEmbed()
                        .setTitle("Zamknij ticket")
                        .setDescription("Aby zamknąć ticket, naciśnij przycisk")
                        .setColor("YELLOW")
                    await channel.send({ embeds: [embed], components: [row] }).then(message => {
                        message.pin({ reason: "Przypięto." })
                    })
                };
                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, 60000);
            break
            case "ticket_close":
                await interaction.channel.delete()
                break;
            case "delete_all_tickets":
                let channels = await interaction.guild.channels.cache.get(channel => channel.name.toLowerCase() === "ticket-")

                channels.delete()
                await interaction.reply({ content: "Usunięto wszystkie tickety!", ephemeral: true })
                break;
        }
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        if (cooldown.has(interaction.user.id)) {
            await interaction.reply({ content: "Poczekaj 3 sekundy przed ponownym uruchomieniem komendy.", ephemeral: true })
        } else {
            try {
                await command.execute(client, interaction);
            } catch (error) {
                let errorEmbedChannel = new MessageEmbed()
                    .setDescription(`Server ID: ${interaction.guild.id} (${interaction.guild.name})\nError:\n\`\`\`${error || "None"}\`\`\``)
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setTimestamp()
                if (error) client.channels.cache.get("914250038744604672").send({embeds: [errorEmbedChannel]})

                let errorEmbed = new MessageEmbed()
                    .setDescription(`Ojoj! Wystąpił jakiś błąd z uruchomieniem komendy. Jeśli problem dalej występuje, zgłoś się na serwerze [\`support\`](https://discord.gg/WEas4WFjse)\nBłąd:\n\`\`\`${error || "Brak."}\`\`\``)
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setTimestamp()
                if (error) interaction.reply({embeds: [errorEmbed]})
            }
        }
        cooldown.add(interaction.user.id);
        setTimeout(() => {
            cooldown.delete(interaction.user.id);
        }, 3000);
    }
}