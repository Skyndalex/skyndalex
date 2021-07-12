const r = require("rethinkdb")
const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.admin.disable\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")

    const g = await r.table("settings").get(message.guild.id).run(client.con)
    if (!g.voteChannelActivate) return message.channel.send("Głosowania na tym serwerze są wyłączone!")

    const channel = await r.table("settings").get(message.guild.id)("voteChannel").run(client.con)
    if (!channel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")

    const voting = args.join(" ")

    const embed = new Discord.MessageEmbed()
    .setTitle("Zorganizowano nowe głosowanie!")
    .addField("Autor", message.author.tag)
    .addField("Treść", voting)
    .setColor("GREEN")
    .setTimestamp()
    client.channels.cache.get(channel).send(embed).then(r => {
        r.react("👍")
        r.react("👎")
    })
};

exports.help = {
    name: "vote",
    description: "Zorganizuj ogłosowanie dla użytkowników!",
    category: "tools",
    aliases: ["zorganizujgłosowanieaczemutenaliasjesttakidługoskądmamtowiedziećaleodpowiedźznajdzienapewnopapajdzwońpodnumer2021ijanaprawdeniewiemcotupisaćwięckończenara"]
}