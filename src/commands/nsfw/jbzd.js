const fetch = require("node-fetch")

exports.run = async (client, message) => {
    /*
    const channel = message.channel
    if (!channel.nsfw) return client.error(message, `Ten kanał musi być NSFW `)
    fetch("https://cenzurabot.pl/api/memes/jbzd")
        .then(resp => resp.json())
        .then(resp => {
            client.sender(message, "Wygenerowano jbzd!", "", "", "GREEN", "", resp.meme)
        })

     */

    const channel = message.channel;
    if (!channel.nsfw) return client.sender(message, "Niedozwolone!", "Ten kanał musi być NSFW aby użyć tej komendy.", "", "RED", "")

    client.sender(message, "Brak funkcji!", "Wygląda na to, że funkcja w bocie została usunięta bądź jest **naprawiana**/tworzona.")
}
exports.help = {
    name: "jbzd",
    description: "Generuje obrazek z strony jbzd.com.pl",
    category: "nsfw",
}