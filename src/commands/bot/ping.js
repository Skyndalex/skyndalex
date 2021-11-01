module.exports = {
    name: "ping",
    description: "WebSocket ping",

    run: async (client, interaction) => {
        client.builder(interaction, `WebSocket status`, `Ping: \`${client.ws.ping}ms\`\n\nServices status: [Click here](https://status.krivebot.xyz)`, ``, `GREEN`)
    }
}