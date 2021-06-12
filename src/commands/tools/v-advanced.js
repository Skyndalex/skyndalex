const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args, level) => {
    /*
    if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano opisu!", client.footer, "RED", "", "")

    const reaction1 = client.emojis.cache.find(emoji => emoji.name === args[1])
    const reaction2 = client.emojis.cache.find(emoji => emoji.name === args[2])

    if (!reaction1) return client.sender(message, "405: Method not allowed", "Nie podano reakcji 1!", client.footer, "RED", "", "")
    if (!reaction2) return client.sender(message, "405: Method not allowed", "Nie podano reakcji 2!", client.footer, "RED", "", "")

    const channel = await r.table("settings").get(message.guild.id)("voteChannel").run(client.con)
    if (!channel) return client.sender(message, "405: Method not allowed", "Nie ustawiono kanału!", client.footer, "RED", "", "")

    const embed = new Discord.MessageEmbed()
        .setTitle("Nowe głosowanie!")
        .setDescription(args.join(" "))
        .setColor("GREEN")
    client.channels.cache.get(channel).send(embed).then(m => {
        m.react(reaction1)
        m.react(reaction2)
    })

    client.sender(message, "Wysłano!", `Wysłano głosowanie na kanał <#${channel}>!`, "", "GREEN", "", "")

     */
    message.channel.send("Już wkrótce!")
}
exports.help = {
    name: "v-advanced",
    description: "Komenda ta umożliwia dodanie własnych reakcji do głosowania",
    category: "tools",
}