const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "405: Method not allowed", "Niedozwolona metoda! Musisz podać użytkownika..", client.footer, "GREEN", "", "")

    let user = client.users.cache.get(args[0])||message.mentions.users.first()||message.author()
    if (!user) return client.sender(message, "404: Not found", "Bot nie znalazł podanego użytkownika.", client.footer, "RED", "", "")

    let imp = ["jest impostorem", "nie jest impostorem"]

    client.sender(message, "", `<@${user.id} ${imp.random()}`, "", "GREEN", "", "")
}
exports.help = {
    name: "impostor",
    description: "Sprawdza, czy ktoś jest impostorem",
    category: "fun",
}