const r = require("rethinkdb");
exports.run = async (client, message) => {
    const getUser = await r.table("economy").get(message.author.id).run(client.con)

    if (!getUser?.job) return message.channel.send("Użytkownik nie jest w żadnej pracy")

    client.sender(message,``,`**Stan konta ${message.author.tag}**\n\nLiczba monet: ${getUser.money}\nPraca: ${getUser.job}`, `Ekonomia - Sprawdzanie konta`, `GREEN`, ``, ``)
}
exports.help = {
    name: "bal",
    usage: "bal",
    perms: "global.send_messages.bal",
    category: "economy",
    description: "Sprawdź swój stan konta",
}