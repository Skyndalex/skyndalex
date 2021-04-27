const Discord = require("discord.js")
const os = require("os")

exports.run = async (client, message, args) => {
    let statEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Statystyki`)
        .addField(`Liczba serwerów`, `${client.guilds.cache.size}`, true)
        .addField(`Liczba użytkowników`,`${client.users.cache.size}`, true)
        .addField(`Liczba kanałów`, `${client.channels.cache.size}`, true)
        .addField(`Użycie pamięci RAM`, `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField('Wersja discord.js', `${Discord.version}`, true)
        .addField(`Wersja node.js`, `${process.version}`, true)
    message.channel.send(statEmbed);

}
exports.help = {
    name: "stats",
    description: "Wyswietla statystyki bota",
    category: "bot",
}