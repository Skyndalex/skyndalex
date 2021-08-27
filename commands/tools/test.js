exports.run = async (client, interaction) => {
    interaction.reply(client.ws.ping)
}
exports.help = {
    name: "test",
    description: "test",
    usage: "test",
    perms: "test",
    category: "test"
}