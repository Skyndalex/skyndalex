exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Podaj nazwę emoji`)

    const emoji = client.emojis.cache.find(x => x.name === args[0])
    if (!emoji) return client.sender(message, "404: Not found", "Nie znaleziono emoji!", client.footer, "RED", "", "")

    message.channel.send(emoji.toString().toLowerCase())
};

exports.help = {
    name: "nitro",
    description: "nitro",
    category: "fun"
}