exports.run = (client, message) => {
    message.channel.send(`Ping: ${client.ws.ping}`)
};

exports.help = {
    name: "ping",
    description: "Ping bota",
    category: "bot",
    aliases: ["pong"]
}