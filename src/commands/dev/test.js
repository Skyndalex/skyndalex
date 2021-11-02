module.exports = {
    name: "test",
    description: "test test lol",
    options: [
        { type: "CHANNEL", name: "h", description: "hhh", channelTypes: ["GUILD_TEXT"]}
    ],

    run: async (client, interaction) => {
        client.builder(interaction, ``, `Command is disabled!`, `KriveBot - error`, `RED`)
    }
}