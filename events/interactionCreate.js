const cooldown = new Set();
module.exports = {
    name: "interactionCreate",
    once: false,

    async execute(client, interaction) {
        if (cooldown.has(interaction.user.id)) {
            interaction.reply({ content: "Poczekaj minutę przed otwarciem następnego ticketa. " }).then(d => {
                setTimeout(() => d.delete(), 10000);
            })
        } else {
            if (interaction.customId === "createticket") {
                const channel = await interaction.guild.channels.create(`Ticket-${interaction.user.tag}`, {
                    type: "GUILD_TEXT",
                    permissionsOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: interaction.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ]
                })
            }
            await interaction.reply({ content: "Utworzono kanał" }).then(d => {
                setTimeout(() => d.delete(), 10000);
            })
        }
        cooldown.add(interaction.user.id);
        setTimeout(() => {
            cooldown.delete(interaction.user.id);
        }, 60000);
    }
}