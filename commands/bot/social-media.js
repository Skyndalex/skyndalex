const Discord = require("discord.js")

exports.run = (client, message) => {
let embed = new Discord.MessageEmbed()
    .setTitle("Social-media")
    .setDescription("Bardzo dużo osób się podszywa pod bota, właściciela... W tej komendzie znajdują się linki do oryginalnych, naszych kont")
    .addField("YouTube", `[Link](${client.youtube})`)
    .addField("Twitter", `[Link](${client.twitter})`)
    .addField("Właściciel bota", `[Otwórz DM](${client.dmEntity})`)
    .addField("Dokumentacja", `[Zobacz](${client.docsLink})`)
    .setFooter("Zachęcamy do zasubskrybowania nas na social-mediach!")
    .setColor("GREEN")
    message.channel.send(embed)
};

exports.help = {
    name: "social-media",
    description: "Wyswietla social-media bota",
    category: "bot",
}