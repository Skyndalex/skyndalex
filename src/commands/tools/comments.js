module.exports = {
    name: "comments",
    description: "Comments system.",
    options: [
        { name: "enable", description: "Enable comments", type: 3, choices: [
                { name: "suggestions", value: "suggestions_comments"},
                { name: "votings", value: "votings_comments"},
                { name: "announcements", value: "broadcasts_comments"}
            ]},
        { name: "disable", description: "Disable comments", type: 3, choices: [
                { name: "suggestions", value: "suggestions_comments_disable"},
                { name: "votings", value: "votings_comments_disable"},
                { name: "announcements", value: "broadcasts_comments_disable"}
            ]},
    ],

    run: async (client, interaction) => {
    }
}