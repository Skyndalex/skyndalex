exports.run = async (client, message) => {
    const channel = message.channel;
    if (!channel.nsfw) return client.sender(message, "Niedozwolone!","Ten kanał musi być NSFW aby użyć tej komendy", "", "RED", "", "")

    const papaj = `https://raw.githubusercontent.com/MrBoombastic/OpenPapaj/1.0/images/${Math.floor(Math.random() * (1586 - 0) + 0)}.jpg`;

    client.sender(message, "Wygenerowano papieża DDD:", "Memy nie mają na celu urazić konkretnych osób a także wiary.\nUWAGA! - Memy zawierają przekleństwa", "Źródło: https://github.com/MrBoombastic/OpenPapaj", "GREEN", "", papaj)
}
exports.help = {
    name: "papaj",
    description: "Generuje memy z papieżem",
    category: "nsfw",
}