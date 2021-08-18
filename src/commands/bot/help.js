exports.run = (client, message) => {
        client.sender(message, "Pomoc", "Lista komend", "", "#f763ff", [
            {
                name: "Bot", value: `> \`${client.commands.filter(c => c.help.category === "bot").map(c => c.help.name).join(' | ') || "Brak"}\``
            },
            {
                name: "Dev", value: `> \`${client.commands.filter(c => c.help.category === "dev").map(c => c.help.name).join(' | ') || "Brak"}\``
            }
        ])
}
module.exports.help = {
    name: "help",
    category: "bot",
    description: "Pomoc",
}