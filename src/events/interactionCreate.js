const {MessageEmbed} = require("discord.js");
const r = require("rethinkdb")
const wait = require('util').promisify(setTimeout);
const cooldown = new Set;
module.exports = {
    name: "interactionCreate",
    once: true,

    async execute (client, interaction) {
        if (interaction.customId === "createticket") {
            if (cooldown.has(interaction.user.id)) {
                return interaction.reply({content: "Poczekaj minutę przed otwarciem następnego ticketa.", ephemeral: true})
            } else {
                const role = await r.table("settings").get(interaction.guild.id)("moderatorRole").run(client.con)
                const channel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
                    type: "GUILD_TEXT",
                    permissionOverwrites: [
                        {
                            id: interaction.user.id, allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: interaction.guild.id, deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: role, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        }
                    ]
                })
                const ticketCreate = new MessageEmbed()
                    .setDescription(`**Utworzono ticket**\n\nUtworzyłeś ticket pomyślnie na kanale: <#${channel.id}> (${channel.name})`)
                    .setColor("GREEN")
                interaction.reply({ embeds: [ticketCreate], ephemeral: true })
            }
            cooldown.add(interaction.user.id)
            setTimeout(() => {
                cooldown.delete(interaction.user.id)
            }, 6000);
        }
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(client, interaction);
        } catch (error) {
            if (error) console.error(error);
            await interaction.reply({ content: 'Wystąpił błąd podczas uruchamiania komendy! Informacja została wysłana do programistów.'});
        }
    }
}