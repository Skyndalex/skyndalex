exports.run = (client, message) => {
    client.sender(message, "", `Ping: \`${client.ws.ping}ms\``, "", "YELLOW", "", "", "")    
}
exports.help = {
    name: "ping",
    usage: "ping",
    perms: "global.send_messages.ping",
    category: "bot",
    description: "Pokazuje ping bota",
}