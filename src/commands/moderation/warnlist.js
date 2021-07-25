const r = require("rethinkdb")
exports.run = async (client, message, args) => {   
    const g = await r.table("moderation")
 
    const user = message.mentions.users.first()  || client.users.cache.get(args[1]) || message.author;
    if (!user) return client.sender(message, "Błąd!", "Nie podałeś użytkownika!", "", "RED", "", "")

    let ttd = await r.table("moderation").filter({userid: user.id}).run(client.con) // NIE RUSZAĆ, TO TYLLO TESTY

    client.sender(message, "Lista warnów", `Lista warnów użytkownika **${user.tag}**`, "", "GREEN", [{
        name: "Lista",
        value: ttd.warn
    }])
};

exports.help = {
    name: "warnlist",
    description: "Sprawdza ilość warnów",
    category: "moderation",
    aliases: ["w"]
}