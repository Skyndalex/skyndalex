module.exports = {
    name: "Get user informations",
    type: "USER",

    run: async (client, interaction) => {
        const user = interaction.user;

        interaction.reply({content: `UserID: ${user.id}\nMention: <@${user.id}>`})
    }
}