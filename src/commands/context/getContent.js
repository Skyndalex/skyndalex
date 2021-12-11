module.exports = {
    name: "getContent",
    type: "MESSAGE",



    run: async (client, interaction) => {
        console.log(interaction)
        const msg = await interaction.channel.messages.fetch(interaction.targetId);

        interaction.reply({content: `Content: \`${msg}\``})
    }
}