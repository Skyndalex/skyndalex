exports.run = (client, message, args) => {
    let command = args[0]
    if (client.commands.get(command)) {
        command =
            client.commands.get(command) ||
            client.commands.get(client.aliases.get(command))

        client.sender(message, "Informacje o komendzie", `Nazwa komendy: **${command.help.name}**`, "", "GREEN", [
            {
                name: "> Opis komendy:",
                value: command.help.description || "Brak"
            },
            {
                name: "> Kategoria",
                value: command.help.category || "Brak"
            },
            {
                name: "> Nazwa komendy",
                value: command.help.name || "Brak"
            }
        ])
    } else {
        switch (args[0]) {
            default:
                client.sender(message, `Komendy`, `Ilość dostępnych komend: ${client.commands.size}\nDokumentacja: [\`Kliknij\`](https://docs.krivebot.xyz)\nStrona internetowa: [\`Kliknij\`](https://krivebot.xyz)`, `Potrzebujesz dodatkowej pomocy? Uzyj komendy ;ticket lub ;request!`, "GREEN", [
                    {
                        name: "Bot",
                        value: "> \`help bot\`"
                    },
                    {
                        name: "Fun (Zabawa)",
                        value: "> \`help fun\`"
                    },
                    {
                        name: "Moderation (moderacja)",
                        value: "> \`help moderation\`"
                    },
                    {
                        name: "Tools (Narzędzia)",
                        value: "> \`help tools\`"
                    },
                    {
                        name: "Developers (Developerzy)",
                        value: "> \`help devs\`"
                    },
                    {
                        name: "Economy (Ekonomia)",
                        value: "> \`help economy\`"
                    },
                    {
                        name: "VC managememt (Zarządzanie VC)",
                        value: "> \`help vc\`"
                    },
                    {
                        name: "NSFW (OSTROŻNIE!)",
                        value: "> \`help nsfw\`"
                    }
                ])
                break;
            case 'bot':
                client.sender(message, "Widzisz kategorię: Bot", `> \`${client.commands.filter(c => c.help.category === "bot").map(c => c.help.name).join(' | ') || "Brak"}\``, "", "GREEN", "", "")
                break;
            case 'fun':
                client.sender(message, "Widzisz kategorię: Fun", `> \`${client.commands.filter(c => c.help.category === "fun").map(c => c.help.name).join(' | ') || "Brak"}\``, "", "GREEN", "", "")
                break;
            case 'moderation':
                client.sender(message, "Widzisz kategorię: Moderation", `> \`${client.commands.filter(c => c.help.category === "moderation").map(c => c.help.name).join(' | ') || "Brak"}\``, "", "GREEN", "", "")
                break;
            case 'tools':
                client.sender(message, "Widzisz kategorię: Tools", `> \`${client.commands.filter(c => c.help.category === "tools").map(c => c.help.name).join(' | ') || "Brak"}\``, "", "GREEN", "", "")
                break;
            case 'devs':
                client.sender(message, "Widzisz kategorię: Developers", `> \`${client.commands.filter(c => c.help.category === "developers").map(c => c.help.name).join(' | ') || "Brak"}\``, "", "GREEN", "", "")
                break;
            case 'economy':
                client.sender(message, "Widzisz kategorię: Economy", `> \`${client.commands.filter(c => c.help.category === "economy").map(c => c.help.name).join(' | ') || "Brak"}\``, "", "GREEN", "", "")
                break;
            case 'vc':
                client.sender(message, "Widzisz kategorię: VC", `> \`${client.commands.filter(c => c.help.category === "vcmanagement").map(c => c.help.name).join(' | ') || "Brak"}\``, "", "GREEN", "", "")
                break;
            case 'nsfw':
                client.sender(message, "Widzisz kategorię: Nsfw", `> \`${client.commands.filter(c => c.help.category === "nsfw").map(c => c.help.name).join(' | ') || "Brak"}\``, "", "GREEN", "", "")
                break;
        }
    }
}
exports.help = {
    name: "help",
    description: "Pomoc",
    category: "bot",
    aliases: ["h", "pomoc", "halp"]
}