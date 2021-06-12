const Discord = require("discord.js")
const os = require("os")
const moment = require("moment")
moment.locale("PL")
exports.run = async (client, message, args) => {
    client.sender(message, "Statystyki", "", "", "GREEN", [
        {
            name: "> \`Zasoby:\`",
            value: `Użycie pamięci RAM: \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\n Wersja Node.Js:\`${process.version}\`\nWersja Discord.Js: \`${Discord.version}\`\nProcesor: \`${require("os").cpus().map((i) => i.model)[0]}\`\nSystem operacyjny: \`Linux\``
        },
        {
            name: "> \`Cache:\`",
            value: `Liczba serwerów: \`${client.guilds.cache.size}\`\nLicza użytkowników: \`${client.users.cache.size}\`\nLiczba kanałów: \`${client.channels.cache.size}\`\nLiczba emotek: \`${client.emojis.cache.size}\``
        },
        {
            name: "> \`Uptime:\`",
            value: require("moment").duration(client.uptime).humanize()
        }
    ])

}
exports.help = {
    name: "stats",
    description: "Wyswietla statystyki bota",
    category: "bot",
}