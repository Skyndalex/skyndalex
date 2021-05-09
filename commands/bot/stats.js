const Discord = require("discord.js")
const os = require("os")
const moment = require("moment")
moment.locale("PL")
exports.run = async (client, message, args) => {
    let statEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Statystyki`)
        .setDescription(`**Uptime: ${require("moment").duration(client.uptime).humanize()}**`)
        .addField(`Liczba serwerów`, `${client.guilds.cache.size}`, true)
        .addField(`Liczba użytkowników`,`${client.users.cache.size}`, true)
        .addField(`Liczba kanałów`, `${client.channels.cache.size}`, true)
        .addField(`Użycie pamięci RAM`, `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField('Wersja discord.js', `${Discord.version}`, true)
        .addField(`Wersja node.js`, `${process.version}`, true)
        .addField("Procesor", require("os").cpus().map((i) => i.model)[0], true)
        .addField("System operacyjny", "linux", true)
    message.channel.send(statEmbed)

}
exports.help = {
    name: "stats",
    description: "Wyswietla statystyki bota",
    category: "bot",
}