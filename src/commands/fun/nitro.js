exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "Błąd", "Podaj emoji", "", "RED", "", "")

    const emoji = client.emojis.cache.find(x => x.name === args[0])
    if (!emoji) return client.sender(message, "Brak", "Nie znaleziono emoji!", client.footer, "RED", "", "")

    message.channel.send(emoji.toString().toLowerCase())
}
exports.help = {
    name: "nitro",
    description: "Wyszukaj sobie emotkę.",
    category: "fun"
}