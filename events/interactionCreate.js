const r = require("rethinkdb")
const cooldown = new Set();
const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")
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
                    channel.send({ content: `<@${interaction.user.id}>, Pomyślnie otworzyłeś swój ticket!` })
                    await interaction.reply({ content: `Otworzono kanał! (<#${channel.id}>)`, ephemeral: true })
                }
                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, 60000);
            }
        } catch { false }

        if (interaction.customId === "dmSupportAccept") {
            client.channels.cache.get("861351339446632508").send({ content: `\`DMSUPPORT\` ${interaction.user.tag} (${interaction.user.id}): ${interaction.content})` })

            interaction.reply({ content: "Wysłano wiadomość do supportu." })
        }
    }
}