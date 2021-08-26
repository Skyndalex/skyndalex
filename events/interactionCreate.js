const cooldown = new Set();
module.exports = {
    name: "interactionCreate",
    once: false,

    async execute(client, interaction) {
        if (cooldown.has(interaction.user.id)) {
            interaction.reply({ content: "Poczekaj minutę przed otwarciem następnego ticketa. ", ephemeral: true })
        } else {
            if (interaction.customId === "createticket") {
                const channel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
                    type: "GUILD_TEXT",
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["SEND_MESSAGES"]
                        },
                        {
                            id: interaction.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                    ]
                })
                await interaction.reply({ content: `Otworzono kanał! (<#${channel.id}>)`, ephemeral: true })
            }
        }
        cooldown.add(interaction.user.id);
        setTimeout(() => {
            cooldown.delete(interaction.user.id);
        }, 60000);
    }
}