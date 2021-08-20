exports.run = async (client, message, args) => {
    let iq = Math.floor(Math.random() * (100 - 0) + 0)

    if (!args[0]) return client.sender(message, "401: No content", "Nie podano argumentu!", client.footer, "RED", "", "")

    client.sender(message, "", `${args[0]} posiada ${iq} iq!`, "", "GREEN", "", "")
}
exports.help = {
    name: "iq",
    description: "Sprawdza, ile ktoś ma iq",
    perms: "server.send_messages.iq",
    category: "fun",
}