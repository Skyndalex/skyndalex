exports.run = (client, message) => {
    client.sender(message, "", `Ping: \`${client.ws.ping}ms\`\n\nDokumentacja: https://docs.krivebot.xyz\nStatus serwisów: https://status.krivebot.xyz\nSerwer wsparcia: https://${client.discord}`, "", "YELLOW", "", "", "")
}
exports.help = {
    name: "ping",
    usage: "ping",
    perms: "global.send_messages.ping",
    category: "bot",
    description: "Pokazuje ping bota",
}