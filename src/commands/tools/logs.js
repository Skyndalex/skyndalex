exports.run = (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.administrator.logs\`", "", "RED", "", "")

    switch (args[0]) {
        default:
            client.sender(message, ``, `Ustawienia logów:\n\n\`channelCreate\`\nLogi tworzenia kanałów\n\n\`channelDelete\`\nLogi usuwania kanału`, ``, `ORANGE`, ``, ``, ``)
            break;
    }
}
exports.help = {
    name: "logs",
    usage: "logs",
    perms: "global.administrator.logs",
    category: "tools",
    description: "Ustawienia logów",
}