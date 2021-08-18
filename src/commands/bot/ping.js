exports.run = (client, message) => {
    client.sender(message, "", `Ping: \`${client.ws.ping}ms\``, "", "YELLOW", "", "", "")    
}
exports.help = {
    name: "ping",
    category: "bot",
    description: "Pokazuje ping bota",
}