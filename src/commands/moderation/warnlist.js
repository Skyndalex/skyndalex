const r = require("rethinkdb")
exports.run = async (client, message, args) => {

    const user = client.users.cache.get(args[0]) || message.mentions.users.first()
    if (!user) return client.sender(message, "Nie podano!", "Nie podano użytkownika", client.moderationFooter, "RED", "", "")

    const warnFromDB = r.table("moderation").get(user.id)("warn").run(client.con)

    console.log(warnFromDB)
}
exports.help = {
    name: "warnlist",
    aliases: ["listawarnow"],
    category: "moderation",
}