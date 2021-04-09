const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Nie podano użytkownika!`)

    let user = client.users.cache.get(args[0])||message.mentions.users.first()||message.author()
    if (!user) return client.error(message, `Nie znaleziono użytkownika`)

    let imp = ["jest impostorem", "nie jest impostorem"]

    const embed = new Discord.MessageEmbed()
        .setDescription(`<@${user.id}> ${imp.random()}`)
        .setColor(`GREEN`)
    message.channel.send(embed)
}
exports.help = {
    name: "impostor",
    description: "Sprawdza, czy ktoś jest impostorem",
    category: "fun",
}