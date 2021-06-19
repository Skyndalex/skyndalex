const Discord = require("discord.js")
const os = require("os")
const moment = require("moment")
moment.locale("PL")
exports.run = async (client, message) => {

    String.prototype.toHHMMSS = function () {
        let sec_num = parseInt(this, 10)
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        let time = hours+':'+minutes+':'+seconds;
        return time;
    }


    const time = process.uptime()
    const uptime = (time + "").toHHMMSS();

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
            value: `Bot: ${require("moment").duration(client.uptime).humanize()}\nSerwer: ${uptime}`,
        }
    ])

}
exports.help = {
    name: "stats",
    description: "Wyswietla statystyki bota",
    category: "bot",
}