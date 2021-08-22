const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.lock\`", "", "RED", "", "")

    message.reply({content: "Ustawienia kanału --> Permisje --> Role/Synchronizuj"})
}
exports.help = {
    name: "unlock",
    usage: "unlock",
    perms: "server.manage_channels.unlock",
    category: "tools",
    description: "Odblokowywanie kanału",
}