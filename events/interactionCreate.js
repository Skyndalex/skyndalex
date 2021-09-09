const r = require("rethinkdb")
const cooldown = new Set();
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    name: "interactionCreate",
    once: false,

    async execute(client, interaction) {
        try {
            const role = await r.table("settings").get(interaction.guild.id)("moderatorRole").run(client.con)
            if (!role) return interaction.reply({ content: "Administrator serwera nie ustawił roli moderatora!", ephemeral: true })

            if (interaction.customId === "createticket") {
                if (cooldown.has(interaction.user.id)) {
                    interaction.reply({ content: "Poczekaj minutę przed otwarciem następnego ticketa. ", ephemeral: true })
                } else {
                    const channel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
                        type: "GUILD_TEXT",
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            },
                            {
                                id: interaction.guild.id,
                                deny: ["VIEW_CHANNEL"]
                            },
                            {
                                id: role,
                                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                            }
                        ]
                    })
                    const embedW = new MessageEmbed()
                        .setDescription(`**Ticket otworzony przez ${interaction.user.tag}**\n\nKliknięcie przycisku spowoduje zamknięcie ticketa.`)
                        .setColor("RED")

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('ticket_close')
                                .setLabel('Zamknij ticket')
                                .setStyle('DANGER'),
                        );
                        channel.send({content: `<@${interaction.user.id}>`})
                        channel.send({
                            embeds: [embedW],
                            components: [row]
                        }).then(p => {
                            p.pin()
                        })

                    const embed = new MessageEmbed()
                        .setDescription(`**Otworzono kanał** (<#${channel.id}>)\n\nZamknij ticket używając przycisku wysłanym na kanale.`)
                        .setColor("GREEN")

                    await interaction.reply({ embeds: [embed], ephemeral: true })

                }
                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, 60000);
            }
        } catch { false }

        if (interaction.customId === "jobs_developer_join") {
           await r.table("economy").insert({
               userid: interaction.user.id,
               money: 0,
               job: "developer"
           }).run(client.con)

            interaction.reply({
                content: "Dołączono do pracy: **Developer**",
            })
        }
        if (interaction.customId === "jobs_developer_no") {
            const embedRemove = new MessageEmbed()
                .setDescription("Odrzucono.")
                .setColor("RED")
            interaction.update({
                embeds: [embedRemove],
                components: []
            })
        }
        if (interaction.customId === "jobs_miner_join") {
            await r.table("economy").insert({
                userid: interaction.user.id,
                job: "miner"
            }).run(client.con)
            await r.table('economy').update({ job: "miner" })

            interaction.reply({
                content: "Dołączono do pracy: **Górnik**",
            })
        }
        if (interaction.customId === "jobs_miner_no") {
            const embedRemove2 = new MessageEmbed()
                .setDescription("Odrzucono.")
                .setColor("RED")
            interaction.update({
                embeds: [embedRemove2],
                components: []
            })
        }
        if (interaction.customId === "ticket_close") {
            interaction.channel.delete({ reason: `Zamknięte przez ${interaction.user.tag}`})
        }
    }
}