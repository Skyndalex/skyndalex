const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return  client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_CHANNELS\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "Brak odpowiednich argumentów!", "Nie podałeś czasu!", client.footer, "RED", "", "")
    if (isNaN(args[0])) return client.sender(message, "405: Method not allowed", "To nie jest liczba! (Musisz wpisać samą liczbę, bez literki **s**", client.footer, "RED", "", "")
    if ((args[0] > 21600) || (args[0] < -0)) return client.sender(message, "405: Method not allowed", "Dłuższy czas cooldownu nie powinien przekraczać 6h!", client.footer, "RED", "", "")

    const rateLimitPerUser = await message.channel.setRateLimitPerUser(args[0])

    client.sender(message, "Ustawiono czas powolny!", "", "", "GREEN", [{name: "Ustawił", value: message.author.tag}, {name: "Ustawiono na", value: `${args[0]} sek`}])

    
    const logChannel = await r.table("logs").get(message.guild.id)("cooldownLog").run(client.con)
    if (!logChannel) return message.channel.send("Nie ustawiono logów cooldownów, więc nie jestem w stanie przekierować je na kanał z logami!").then(m => {
        m.delete({timeout: 1000})
    })

    const embedLog = new Discord.MessageEmbed()
    .setTitle("Logi: dodano cooldown")
    .addField("Dodał", message.author.tag)
    .addField("Czas", args[0]+"s")
    .addField("Kanał", message.channel.name)
    .setColor("GREEN")
    client.channels.cache.get(logChannel).send(embedLog)
}
exports.help = {
    name: "slowmode",
    description: "Ustawia czas powolny na kanale",
    category: "tools",
    aliases: ["cooldown"]
}