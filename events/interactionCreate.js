const r = require("rethinkdb")
const cooldown = new Set();
module.exports = {
    name: "interactionCreate",
    once: false,

    async execute(client, interaction) {
            const table = await r.table("settings").get(interaction.guild.id).run(client.con)
            if (!table?.moderatorRole) return interaction.reply({content: "Administrator serwera nie ustawił roli moderatora!", ephemeral: true})
            
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
                            id: table.moderatorRole,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        }
                    ]
                })
                channel.send({content: `<@${interaction.user.id}>, Pomyślnie otworzyłeś swój ticket!`})
                await interaction.reply({ content: `Otworzono kanał! (<#${channel.id}>)`, ephemeral: true })
            }
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, 60000);
        }
        if (interaction.customId === "ticketConfirm") {
            if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "Nie masz permisji", ephemeral: true})

            await r.table("tickets").insert({ id: interaction.guild.id, activate: true }).run(client.con)

            interaction.reply({content: "Pomyślnie włączono tickety", ephemeral: true})
        }
    }
}