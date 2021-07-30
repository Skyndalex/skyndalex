const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    message.channel.send("Ze względu na problemy z ratelimitami usunęliśmy tą komendę. Zostanie naprawiona wkrótce")
}

exports.help = {
    name: "tempmute",
    aliases: ["wycisztymczasowo"],
    category: "moderation",
}