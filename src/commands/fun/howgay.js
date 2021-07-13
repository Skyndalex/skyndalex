exports.run = async (client, message, args) => {
    let percent = Math.floor(Math.random() * (100 - 0))

    if (!args[0]) return client.sender(message, "Błąd!", "Nie podano argumentów", "", "RED", "", "")

    client.sender(message, "", `${args[0]} jest gejem na ${percent}%`, "", "GREEN", "", "")

}
exports.help = {
    name: "howgay",
    description: "Komenda sprawdzająca, jak bardzo ktoś jest gejem",
    category: "fun",
}