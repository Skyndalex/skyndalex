const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, "Nie podano emoji.")

    const channel = await r.table("settings").get(message.guild.id)("emojiSuggestChannel").run(client.con)
    if (!channel) return client.error(message, "Nie znaleziono kanału ")

    const emojiName = args.slice(0).join(" ")
    if (!emojiName) return client.error(message, "Nie podano opisu emoji")

    const embed = new Discord.MessageEmbed()
        .setTitle("Wysłano propozycję emoji")
        .setDescription(`Opis: ${emojiName}`)
        .setColor("GREEN")
    if (message.attachments.map(a=>a.url)[0]) embed.setImage(message.attachments.map(a=>a.url)[0])
    if (message.attachments.map(a=>a.url)[0]) embed.setFooter('W obrazku pokazane jest tylko jedno pierwsze zdjęcie! Propozycje prosimy wysyłać pojedyńczo.');
    client.channels.cache.get(channel).send(embed)

    client.sender(message, `Wysłałeś propozycję pomyślnie!`, `Opis emotki: ${emojiName}`, ``, `GREEN`)

}
exports.help = {
    name: "esuggest",
    description: "Wysyła propozycję emoji",
    category: "tools",
}