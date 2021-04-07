const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return client.error(message, `Nie masz permisji! `);
    if (!args[0]) return client.error(message, "Nie podałeś czasu")
    if (isNaN(args[0])) return client.error(message, 'To nie jest liczba!');
        message.channel.setRateLimitPerUser(args[0])
    const embed = new Discord.MessageEmbed()
        .setTitle("Ustawiono czas powolny")
        .addField("Ustawił", message.author.tag)
        .addField("Ustawiono na", `${args[0]}sek`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "slowmode",
    description: "Ustawia czas powolny na kanale",
    category: "tools",
    aliases: ["cooldown"]
}