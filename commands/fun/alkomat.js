exports.run = async (client, message, args) => {
    let v = Math.floor(Math.random() * (10 - 0) + 0)

    if (!args[0]) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

    client.sender(message, "", `${args[0]} posiada ${v} promili!`, "", "GREEN", "")
}
exports.help = {
    name: "alkomat",
    description: "Sprawdza poziom promili",
    category: "fun",
}