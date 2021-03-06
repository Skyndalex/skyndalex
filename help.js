exports.load = (gateway, discord) => {
    gateway.command("help", "help", "Pokazuje pomoc", "help [komenda]", ["pomoc"], (client, msg) => {
        if (client.args[0] && client.commands.hasOwnProperty(client.args[0])) {
            discord.createMessage(msg, {
                embed: {
                    title: "Pomoc",
                    description: `Opis: \`${client.commands[client.args[0]].description}\`\nUżycie: \`${client.commands[client.args[0]].usage}\`\nAliasy: \`${client.commands[client.args[0]].aliases.join(", ") || "brak"}\``,
                    color: 0x2ecc71
                }
            })
        } else {
            let categories = {};
            const blacklist = ["help", "dev"];
            let fields = [];

            for (command in client.commands) {
                if (!categories.hasOwnProperty(client.commands[command].category)) {
                    categories[client.commands[command].category] = [];
                }
            }

            for (command in client.commands) {
                if (!blacklist.includes(client.commands[command].category)) {
                    categories[client.commands[command].category].push("`" + command + "`")
                }
            }

            for (category in categories) {
                if (!blacklist.includes(category)) {
                    fields.push({
                        "name": category,
                        "value": "> " + categories[category].join(" | "),
                        "inline": false
                    })
                }
            }

            discord.createMessage(msg, {
                embed: {
                    title: "Pomoc:",
                    description: "Potrzebujesz pomocy? Wejdź na nasz support (s/support)",
                    fields: fields,
                    color: 0x2ecc71
                }
            })
        }
    })
}