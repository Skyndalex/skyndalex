const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    const emoji = client.emojis.cache.get(args[0]) || client.emojis.cache.find(emoji => emoji.name === args[0])
    if (!emoji) return client.error(message, "Proszę wpisać __nazwę__ emoji.")

    let animated = {
        true: "Tak",
        false: "Nie"
    }

    const embed = new Discord.MessageEmbed()
        .setTitle(`Informacje o emoji: ${emoji.name}`)
        .addField("Czy jest animowana?", animated[emoji.animated])
        .addField("ID emotki", emoji.id)
        .addField("Nazwa emotki", emoji.name)
        .addField("Link do pobrania", `[Klik](${emoji.url})`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "einfo",
    description: "Wyswietla informacje o emotce",
    category: "tools",
}