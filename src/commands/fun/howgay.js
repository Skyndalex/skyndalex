exports.run = async (client, message, args) => {
    let percent = Math.floor(Math.random() * (100 - 0) + 0)

    if (!args[0]) return client.sender(message, "401: No content.", "Nie podano argumentów", client.footer, "RED", "", "")

    client.sender(message, "", `${args[0]} jest gejem na ${percent}%`, "", "GREEN", "", "")

}
exports.help = {
    name: "howgay",
    description: "Komenda sprawdzająca, jak bardzo ktoś nienawidzi PiS",
    category: "fun",
}