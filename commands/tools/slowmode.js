const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return  client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_CHANNELS\`", client.footer, "RED", "", "")

    if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podałeś czasu!", client.footer, "RED", "", "")
    if (isNaN(args[0])) return client.sender(message, "405: Method not allowed", "To nie jest liczba! (Musisz wpisać samą liczbę, bez literki **s**", client.footer, "RED", "", "")
    if ((args[0] > 21600) || (args[0] < -0)) return client.sender(message, "405: Method not allowed", "Dłuższy czas cooldownu nie powinien przekraczać 6h!", client.footer, "RED", "", "")

    await message.channel.setRateLimitPerUser(args[0])

    /*
    const embed = new Discord.MessageEmbed()
        .setTitle("Ustawiono czas powolny")
        .addField("Ustawił", message.author.tag)
        .addField("Ustawiono na", `${args[0]} sek`)
        .setColor("GREEN")
    message.channel.send(embed)


     */
    client.sender(message, "Ustawiono czas powolny!", "", "", "GREEN", [{name: "Ustawił", value: message.author.tag}, {name: "Ustawiono na", value: `${args[0]} sek`}])
}
exports.help = {
    name: "slowmode",
    description: "Ustawia czas powolny na kanale",
    category: "tools",
    aliases: ["cooldown"]
}