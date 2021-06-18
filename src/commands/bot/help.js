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
        /*
        client.sender(message, `Pomoc (${client.commands.size})`, `Potrzebujesz pomocy? Wejdź na nasz [support](${client.url}/discord)\nPotrzebujesz pomocy z ustawianiem? Zobacz naszą [dokumentację](https://docs.krivebot.xyz)`, "Aby zobaczyć więcej informacji o komendzie, użyj komendy help [nazwa]", "GREEN", [
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
              name: "NSFW (Ostrożnie)",
              value: `> \`${client.commands.filter(c => c.help.category === "nsfw").map(c => c.help.name).join(" | ") || "Brak"}\``
            },
            {
                name: "Zarządzanie kanałami VC",
                value: `> \`${client.commands.filter(c => c.help.category === "vcmanagement").map(c => c.help.name).join(" | ") || "Brak"}\``
            }
        ])
    }

         */
        switch (args[0]) {
            default:
                client.sender(message, `Komendy`, `Ilość dostępnych komend: ${client.commands.size}\nDokumentacja: [link](https://docs.krivebot.xyz)\nStrona internetowa: [link](https://krivebot.xyz)`, `Potrzebujesz dodatkowej pomocy? Uzyj komendy ;ticket lub ;request!`, "GREEN", [
                    {
                        name: "Kat: Bot",
                        value: "> \`help bot\`"
                    },
                    {
                        name: "Kat: Fun (Zabawa)",
                        value: "> \`help fun\`"
                    },
                    {
                        name: "Kat: Moderation (moderacja)",
                        value: "> \`help moderation\`"
                    },
                    {
                        name: "Kat: tools (Narzędzia)",
                        value: "> \`help tools\`"
                    },
                    {
                        name: "Kat: Developers (Developerzy)",
                        value: "> \`help devs\`"
                    },
                    {
                        name: "Kat: economy (Ekonomia)",
                        value: "> \`help economy\`"
                    },
                    {
                        name: "Kat: VC managememt (Zarządzanie VC)",
                        value: "> \`help vc\`"
                    },
                    {
                        name: "Kat: NSFW",
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