module.exports = {
    name: "Get user informations",
    type: "USER",

    run: async (client, interaction) => {
        const target = await interaction.guild.members.fetch(interaction.targetId);

        interaction.reply({content: `UserID: ${target.id}\nMention: <@${target.id}>`})
    }
}