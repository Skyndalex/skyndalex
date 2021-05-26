const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const repPoints = args[1]
    if (!repPoints) return message.channel.send("Podaj ilość reputacji.")

    const user = message.mentions.users.first()
    if (!user) return message.channel.send("Nie znaleziono użytkownika użytkownika")

    const repInsert = await r.table("system").insert({
        id: user.id
    }).run(client.con)

    const repUpdate = await r.table("system").get(user.id).update({rep: repPoints + repPoints}).run(client.con)

    const repList = await r.table("system").get(user.id)("rep").run(client.con)

    message.channel.send(`Data:\n\nUser: ${user.tag}\nAuthor: ${message.author.tag}\nReputation: ${repPoints}\nCurrent reputation: ${repList}`)
}
exports.help = {
    name: "rep",
    description: "Dodaje reputacje użytkownikowi",
    category: "fun",
}