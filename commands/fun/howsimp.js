exports.run = async (client, message, args) => {
    switch (args[0]) {
        case "kubus": message.reply("no kubus na 100% simpuje do tomka, tego nawet sprawdzac nie musze")
        break;
        case "tomek": message.reply("no tomek to do ciaha akurat")
        break;
        case "unx": message.reply("kto to jest?")
        break;
    }

    let percent = Math.floor(Math.random() * (100 - 0) + 0)

    if (!args[0]) return client.sender(message, "401: No content.", "Nie podano argumentów", client.footer, "RED", "", "")

    client.sender(message, "", `${args[0]} jest simpem na ${percent}%`, "", "GREEN", "", "")

}
exports.help = {
    name: "howsimp",
    description: "Komenda sprawdzająca, jak bardzo ktoś jest SIMPem",
    perms: "server.send_messages.howsimp",
    category: "fun",
}