exports.run = async (client, message) => {
    client.sender(message, "", "Link do twittera bota: [Kliknij](https://twitter.com/Krive7)", "", "GREEN", "", "")
}
exports.help = {
    name: "twitter",
    description: "Link do twittera bota.",
    category: "bot",
}