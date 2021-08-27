exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "Błąd", "Podaj __nazwę__ emoji", "", "RED", "", "", "")

    const emoji = client.emojis.cache.find(x => x.name === args[0])
    if (!emoji) return client.sender(message, "Błąd!", "Nie znaleziono emoji!", client.footer, "RED", "", "")

    message.channel.send({content: emoji.toString().toLowerCase()})
};

exports.help = {
    name: "nitro",
    description: "nitro",
    category: "fun"
}