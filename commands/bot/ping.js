exports.run = (client, message) => {
    client.sender(message, "", `Opóźnienie bota: ${client.ws.ping}ms\nOpóźnienie API discorda: ${Date.now() - message.createdTimestamp}ms`, "", "GREEN", "", "")
};

exports.help = {
    name: "ping",
    description: "Ping bota",
    category: "bot",
}