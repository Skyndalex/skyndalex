const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "Błąd!", "Nie podano argumentów!", "", "RED", "", "")

    const ip1 = Math.floor(Math.random() * (200 - 0))
    const ip2 = Math.floor(Math.random() * (201 - 0))
    const ip3 = Math.floor(Math.random() * (202 - 0))
    const ip4 = Math.floor(Math.random() * (203 - 0))

    const password = `bla123${Math.floor(Math.random() * (10000 - 0) + 0)}blabla (no scam)`

    const logins = ["pasztetowo123", "minecrafterrr10003", "Korrumz2", "ŚwinkaMorska320", "TwójDarmowyHacker10391", "JestemZaPIS"]
    const emails = ["nI@gmail.com", "secret@krivebot.xyz", "support@krivebot.xyz", "verifikejszyn@gmail.com", "email102020@gmail.com"]

    const embed1 = new Discord.MessageEmbed()
        .setTitle("W toku...")
        .setDescription("Pobieram dane...")
        .setColor("GREEN")

    const data = new Discord.MessageEmbed()
        .setTitle("Hackowanie!")
        .setDescription("Pobrano dane!")
        .addField("Adres IP", `${ip1}.${ip2}.${ip3}.${ip4}`)
        .addField("Hasło", password)
        .addField("Login", logins.random())
        .addField("Email", emails.random())
        .addField("Discord tag", args[0])
        .setColor("GREEN")
    message.channel.send(embed1).then(edits => {
        edits.edit(data)
    })
}
exports.help = {
    name: "hack",
    description: "Zhakuj kogoś ::::D",
    category: "fun",
}