const Discord = require('discord.js')

exports.run = (client, message, args) => {
    let commandsf = [
        "set",
        "8ball",
        "ship",
        "work",
        "bal",
        "stats"
    ]
    client.sender(message, `Pomoc (${client.commands.size})`, `Potrzebujesz pomocy? Wejdź na nasz [support](${client.url}/discord)\nPotrzebujesz pomocy z ustawianiem? Zobacz naszą [dokumentację](${client.docsLink})`, `KriveBot poleca komende ${commandsf.random()}`, "GREEN", [
        {
            name: "Bot",
            value: `> \`${client.commands.filter(c => c.help.category==="bot").map(c => c.help.name).join(' | ')||"Brak"}\``
        },
        {
            name: "Zabawa",
            value: `> \`${client.commands.filter(c => c.help.category==="fun").map(c => c.help.name).join(' | ')||"Brak"}\``
        },
        {
            name: "Moderacja",
            value: `> \`${client.commands.filter(c => c.help.category==="moderation").map(c => c.help.name).join(" | ")||"Brak"}\``
        },
        {
            name: "Narzędzia",
            value: `> \`${client.commands.filter(c => c.help.category==="tools").map(c => c.help.name).join(" | ")||"Brak"}\``
        },
        {
            name: "Zarządzanie botem",
            value: `> \`${client.commands.filter(c => c.help.category==="developers").map(c => c.help.name).join(" | ")||"Brak"}\``
        },
        {
            name: "Ekonomia",
            value: `> \`${client.commands.filter(c => c.help.category==="economy").map(c => c.help.name).join(" | ")||"Brak"}\``
        },
        {
            name: "Zarządzanie kanałami VC",
            value: `> \`${client.commands.filter(c => c.help.category==="vcmanagement").map(c => c.help.name).join(" | ")||"Brak"}\``
        }
    ])

}
exports.help = {
    name: "help",
    description: "Pomoc",
    category: "bot",
    aliases: ["h", "pomoc", "halp"]
}