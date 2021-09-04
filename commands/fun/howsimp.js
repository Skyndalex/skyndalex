exports.run = async (client, message, args) => {
    if (args[0] === "kubus") return message.reply("no kubus na 100% simpuje do tomka, tego nawet sprawdzac nie musze")
    if (args[0] === "tomek") return message.reply("no tomek to do ciaha akurat")
    if (args[0] === "unx") return message.reply("kto to jest?")

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