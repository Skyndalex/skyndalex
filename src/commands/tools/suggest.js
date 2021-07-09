const r = require("rethinkdb")
const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    const classicSuggestEnable = await r.table("settings").get(message.guild.id).run(client.con)
    if (!classicSuggestEnable?.classicSuggestActivate) return message.channel.send("Kanały klasycznych propozycji są wyłączone! Proszę je włączyć komendą \`activate\`.")

    const channel = await r.table("settings").get(message.guild.id)("suggestClassicChannel").run(client.con)
    const suggestion = args.join(" ")

    const embed = new Discord.MessageEmbed()
    .setTitle("Nowa propozycja! 💡")
    .addField("Autor", message.author.tag)
    .addField("Treść", suggestion)
    .addField("Kanał, z którego wysłano", message.channel.name)
    .setTimestamp()
    .setColor("GREEN")
    client.channels.cache.get(channel).send(embed)

    client.sender(message, "Wysłano sugestię!", "Wysłano pomyślnie sugestię na kanał! Dziękuję za skorzystanie z funkcji!", "", "GREEN", "", "")
}
exports.help = {
    name: "suggest",
    description: "Wyślij propozycję",
    category: "tools",
    aliases: ["sg"]
}