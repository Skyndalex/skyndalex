exports.run = (client, message) => {
    client.sender(message, "", `Ping: \`${client.ws.ping}ms\`\n\nDokumentacja: https://docs.krivebot.xyz\nStatus serwisów: https://status.krivebot.xyz\nSerwer wsparcia: ${client.discord}`, "", "YELLOW", "", "", "")
}
exports.help = {
    name: "bal",
    usage: "bal",
    perms: "global.send_messages.bal",
    category: "economy",
    description: "Sprawdź swój stan konta",
}