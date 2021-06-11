exports.run = async (client, message) => {
    const channel = message.channel;
    if (!channel.nsfw) return client.sender(message, "Niedozwolone!","Ten kanał musi być NSFW aby użyć tej komendy", "", "RED", "", "")

    const stonoga = `https://raw.githubusercontent.com/MrBoombastic/OpenStonoga/1.0/memes/${Math.floor(Math.random() * (1586 - 0) + 0)}.jpg`

    client.sender(message, "Mem z stonogą", "Memy nie mają na celu urazić konkretnych osób a także wiary.\nUWAGA! - Memy zawierają przekleństwa", "Źródło: https://github.com/MrBoombastic/OpenStonoga", "GREEN", "", stonoga)

}
exports.help = {
    name: "stonoga",
    description: "Generuje memy z stonogą",
    category: "nsfw",
}