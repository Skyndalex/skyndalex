const r = require("rethinkdb")
module.exports = {
    name: "set",
    description: "Bot settings.",
    options: [
        { type: "CHANNEL", name: "broadcast", description: "Broadcast channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "suggestions", description: "Suggestions channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "complaints", description: "Complaints channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "images", description: "Images channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "welcome_channel", description: "Welcome channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "goodbye_channel", description: "Goodbye channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "applications", description: "Applications channel", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "moderator_role", description: "Server moderator role [Required for tickets]", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "muted_role", description: "The role of the muted user"},
        { type: "CHANNEL", name: "user_role", description: "User role [Required for verification]", channelTypes: ["GUILD_TEXT"]},
        { type: "CHANNEL", name: "auto_role", description: "If a user enters the server, they will automatically get the role set.", channelTypes: ["GUILD_TEXT"]},
    ],

    run: async (client, interaction) => {
            for (let option of interaction.options.data) {
                switch (option.name) {
                    case "broadcast":
                        interaction.reply({content: `Choosed option: ${option.name}`}) // Test message
                        break;
                }
            }
    }
}