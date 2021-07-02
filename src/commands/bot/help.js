const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let command = args[0];
    if (client.commands.get(command) || client.commands.get(client.aliases.get(command)) ) {
      command =
        client.commands.get(command) ||
        client.commands.get(client.aliases.get(command));

        client.sender(message, "Informacje o komendzie", "", "", "GREEN", [
            {
                name: "Nazwa",
                value: command.help.name
            },
            {
                name: "Opis",
                value: command.help.description
            },
            {
                name: "Aliasy",
                value: command.help.aliases
            },
            {
                name: "Kategoria",
                value: command.help.category
            }
        ])
    } else {
        client.sender(message, `Pomoc (${client.commands.size})`, `Lista wszystkich komend.`, `KriveBot SUPPORT v2.0`, `GREEN`, [
            {
                name: `Bot`,
                value: `> \`${client.commands.filter(c => c.help.category === "bot").map(c => c.help.name).join(' | ') || "Brak"}\``
            },
            {
                name: "Narzędzia",
                value: `> \`${client.commands.filter(c => c.help.category === "tools").map(c => c.help.name).join(' | ') || "Brak"}\``
            }
        ])
    }
};

exports.help = {
    name: "help",
    description: "Pomoc - lista wsystkich dostępnych komend",
    category: "bot",
    aliases: ["pomoc"]
}