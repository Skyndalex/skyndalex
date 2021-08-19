exports.run = async (client, message, args) => {
    if (!args[0]) client.sender(message, "Błąd!", "Nie zadałeś mi pytania!", "", "RED", "", "", "")
}
exports.help = {
    name: "8ball",
    usage: "8ball [pytanie]",
    perms: "server.send_messages.8ball",
    category: "fun",
    description: "Zadaj mi pytanie!",
}