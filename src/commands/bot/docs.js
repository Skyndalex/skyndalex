exports.run = async (client, message) => {
    client.sender(message, "", "Link do dokumentacji bota: [Kliknij](https://docs.krivebot.xyz)", "", "GREEN", "", "")
}
exports.help = {
    name: "docs",
    description: "Link do twittera bota.",
    category: "bot",
}