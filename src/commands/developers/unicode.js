const Discord = require("discord.js");
const r = require("rethinkdb")
exports.run = async (client, message) => {
    let dev = ["817883855310684180"]
    if (!dev.includes(message.author.id)) return message.channel.send("Tylko dla developera!")

    let unicode = "\`Arrows:\n\n ←, ↑, →, ↓, ↚ , ↛ , ↜, ⇄, ⇅, ⇆, ⇇, ⇈, ⇉\`"

    client.sender(message, "", unicode, "", "GREEN", "", "")
}

exports.help = {
    name: "unicode",
    description: "Przydatne narzędzie dla programistów.",
    category: "developers"
}