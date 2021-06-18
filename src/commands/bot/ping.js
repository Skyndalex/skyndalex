exports.run = (client, message) => {
    client.sender(message, "", `[Status](https://status.krivebot.xyz) naszych wszystkich serwisów\n\nOpóźnienie bota: \`${client.ws.ping}ms\`\nOpóźnienie API: \`${Date.now() - message.createdTimestamp}ms\``, "", "GREEN", "", "")
};

exports.help = {
    name: "ping",
    description: "Ping bota",
    category: "bot",
}