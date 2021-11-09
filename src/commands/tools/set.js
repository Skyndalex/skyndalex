module.exports = {
    name: "set",
    description: "Bot settings.",
    options: [
        { type: "CHANNEL", name: "suggestions", description: "Suggestions channel", channelTypes: ["GUILD_TEXT"]}
    ],

    run: async (client, interaction) => {
        client.builder(interaction, `Settings`, ``, `Logs settings: /logs`, `GREEN`, [
            { name: "\`suggestionsChannel\`", value: `> Suggestion channel.\n*psst, you can set a comment system. \`/comments\`*`}
        ])
    }
}