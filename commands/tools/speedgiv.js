const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (!args[0]) return client.error(message, "Nie znaleziono.")
    if (!user) return client.error(message, "Nie znaleziono.")
    if(user.id===message.author.id) return message.channel.send("Z samym sobą chcesz rozpocząć szybki giveaway?")

    const embedS = new Discord.MessageEmbed()
        .setTitle("Przetwarzanie szybkiego giveawaya w toku...")
        .setDescription(`${message.author.tag} walczy o nagrodę z użytkownikiem ${user.tag}!`)
        .setColor("GREEN")
    message.channel.send(embedS).then(m => {
        setTimeout(function () {
            m.edit(embedW)
        }, 20000)
    })

    let winner = [
        `<@${message.author.id}>`,
        `<@${user.id}>`
    ]

    const embedW = new Discord.MessageEmbed()
        .setTitle("Mamy zwycięzce!")
        .setDescription(`A zwycięzcą jest... ${winner.random()}`)
        .setColor("GREEN")
}
exports.help = {
    name: "speedgiv",
    description: "Szybka walka o nagrodę pomiędzy użytkownikami",
    category: "tools",
}