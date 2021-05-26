exports.run = (client, message, args) => {
    let command = args[0]
    if (client.commands.get(command)) {
        command =
            client.commands.get(command) ||
            client.commands.get(client.aliases.get(command))

            client.sender(message, "Informacje o komendzie", `Nazwa komendy: **${command.help.name}**`, "", "GREEN", [
                {
                    name: "> Opis komendy:",
                    value: command.help.description||"Brak"
                },
                {
                    name: "> Kategoria",
                    value: command.help.category||"Brak"
                },
                {
                    name: "> Nazwa komendy",
                    value: command.help.name||"Brak"
                }
            ])
    } else {
        client.sender(message, `Pomoc (${client.commands.size})`, `Potrzebujesz pomocy? Wejdź na nasz [support](${client.url}/discord)\nPotrzebujesz pomocy z ustawianiem? Zobacz naszą [dokumentację](${client.docsLink})`, "Aby zobaczyć więcej informacji o komendzie, użyj komendy help [nazwa]", "GREEN", [
            {
                name: "Bot",
                value: `> \`${client.commands.filter(c => c.help.category === "bot").map(c => c.help.name).join(' | ') || "Brak"}\``
            },
            {
                name: "Zabawa",
                value: `> \`${client.commands.filter(c => c.help.category === "fun").map(c => c.help.name).join(' | ') || "Brak"}\``
            },
            {
                name: "Moderacja",
                value: `> \`${client.commands.filter(c => c.help.category === "moderation").map(c => c.help.name).join(" | ") || "Brak"}\``
            },
            {
                name: "Narzędzia",
                value: `> \`${client.commands.filter(c => c.help.category === "tools").map(c => c.help.name).join(" | ") || "Brak"}\``
            },
            {
                name: "Zarządzanie botem",
                value: `> \`${client.commands.filter(c => c.help.category === "developers").map(c => c.help.name).join(" | ") || "Brak"}\``
            },
            {
                name: "Ekonomia",
                value: `> \`${client.commands.filter(c => c.help.category === "economy").map(c => c.help.name).join(" | ") || "Brak"}\``
            },
            {
                name: "Zarządzanie kanałami VC",
                value: `> \`${client.commands.filter(c => c.help.category === "vcmanagement").map(c => c.help.name).join(" | ") || "Brak"}\``
            }
        ])
    }
}
exports.help = {
    name: "help",
    description: "Pomoc",
    category: "bot",
    aliases: ["h", "pomoc", "halp"]
}
