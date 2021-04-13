const Discord = require("discord.js")

exports.run = async (client, message) => {
let embed = new Discord.MessageEmbed()
    .setTitle("Social-media bota")
    .setDescription("Bardzo dużo osób się podszywa pod bota, właściciela... W tej komendzie znajdują się linki do oryginalnych, naszych kont")
    .addField("YouTube", "[Link](https://www.youtube.com/channel/UC_N99xLClLlM9t-DleWwrog)")
    .addField("Twitter", "[Link](https://twitter.com/Krive7)")
    .addField("Właściciel bota", "[Otwórz DM](https://discord.com/users/509014773006991376)")
    .addField("Dokumentacja", "[Zobacz](https://docs.krivebot.xyz)")
    .setFooter("Zachęcamy do zasubskrybowania nas na social-mediach!")
    .setColor("GREEN")
    message.channel.send(embed)
};

exports.help = {
    name: "social-media",
    description: "Wyswietla social-media bota",
    category: "bot",
}