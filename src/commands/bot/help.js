exports.run = (client, message, args) => {
    let command = args[0]
    if (client.commands.get(command)) {
        command =
            client.commands.get(command) ||
            client.commands.get(client.aliases.get(command))
        
            client.sender(message, "Informacje o komendzie", "", "", "YELLOW", [
                {
                    name: "Nazwa komendy", value: command.help.name || "Brak"
                },
                {
                    name: "Opis komendy", value: command.help.description || "Brak"
                },
                {
                    name: "Użycie komendy", value: command.help.usage || "Brak"
                },
                {
                    name: "Wymagane permisje", value: `\`${command.help.perms}\`` || "Brak"
                },
                {
                    name: "Kategoria", value: command.help.category || "Brak"
                }
            ])
    } else {
    client.sender(message, "Pomoc", "Sprawdzanie permisji: \`help [komenda]\`\nDokumentacja: \`https://docs.krivebot.xyz\`", "", "#f763ff", [
        {
            name: "Bot", value: `> \`${client.commands.filter(c => c.help.category === "bot").map(c => c.help.name).join(' | ') || "Brak"}\``
        },
        {
            name: "Dev", value: `> \`${client.commands.filter(c => c.help.category === "dev").map(c => c.help.name).join(' | ') || "Brak"}\``
        },
        {
            name: "Zabawa", value: `> \`${client.commands.filter(c => c.help.category === "fun").map(c => c.help.name).join(' | ') || "Brak"}\``
        },
        {
            name: "Moderacja", value: `> \`${client.commands.filter(c => c.help.category === "mod").map(c => c.help.name).join(' | ') || "Brak"}\``
        },
        {
            name: "Narzędzia", value: `> \`${client.commands.filter(c => c.help.category === "tools").map(c => c.help.name).join(' | ') || "Brak"}\``
        }
    ])
    }
}
exports.help = {
    name: "help",
    usage: "help [komenda]",
    perms: "global.send_messages.help",
    category: "bot",
    description: "Główna komenda pomocy bota",
}