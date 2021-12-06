module.exports = {
    name: "Get message content",
    type: "MESSAGE",

    run: async (client, interaction) => {
        const msg = await interaction.channel.messages.fetch(interaction.targetId);

        await interaction.reply({content: `Content: \`${msg}\``})
    }
}