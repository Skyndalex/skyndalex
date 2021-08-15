exports.run = (client, message) => {
    message.channel.send(`Ping: \`${client.ws.ping}ms\``)
}
exports.help = {
    name: "ping",
    description: "Ping",
    category: "bot",
    aliases: ["pstrong"]
}