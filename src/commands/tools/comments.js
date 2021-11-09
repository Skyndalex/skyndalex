module.exports = {
    name: "comments",
    description: "Comments system.",
    options: [
        { type: "STRING", name: "enable", description: "enable comments", choices: [ { name: "Suggestions comment system", value: "Enable"}]},
        { type: "STRING", name: "disable", description: "disable comments", choices: [ { name: "Suggestions comment system", value: "Disable"}]}],

    run: async (client, interaction) => {
        client.builder(interaction, `Settings`, ``, `Logs settings: /logs`, `GREEN`, [
            { name: "\`suggestionsChannel\`", value: `> Suggestion channel.\n*psst, you can set a comment system. \`/comments\`*`}
        ])
    }
}