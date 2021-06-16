exports.run = async (client, message) => {
    client.sender(message, "", "Link do youtuba bota: [Kliknij](https://www.youtube.com/channel/UC_N99xLClLlM9t-DleWwrog)", "", "GREEN", "", "")
}
exports.help = {
    name: "youtube",
    description: "Link do youtuba bota.",
    category: "bot",
}