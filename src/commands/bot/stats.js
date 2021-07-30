const os = require("os")
const Discord = require("discord.js")
exports.run = async (client, message) => {
    client.sender(message, "Statystyki", "", "", "GREEN", [
        {
            name: "> \`Zasoby:\`",
            value: ` Wersja Node.Js:\`${process.version}\`\nWersja Discord.Js: \`${Discord.version}\`\nProcesor: \`${require("os").cpus().map((i) => i.model)[0]}\`\nSystem operacyjny: \`GNU/Linux\``
        },
        {
            name: "> \`Cache:\`",
            value: `Liczba serwerów: \`${client.guilds.cache.size}\`\nLiczba użytkowników: \`${client.users.cache.size}\`\nLiczba kanałów: \`${client.channels.cache.size}\`\nLiczba emotek: \`${client.emojis.cache.size}\``
        },
        {
            name: "> \`Uptime:\`",
            value: `Bot: ${require("moment").locale("pl").duration(client.uptime).humanize()}`,
        }
    ])
}
exports.help = {
    name: "stats",
    description: "Wyswietla statystyki bota",
    category: "bot",
}