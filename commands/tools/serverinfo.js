const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {

    const guild = client.guilds.cache.get(args[0])||message.guild
    if (!guild) return client.error(message, "Nie znalazłem serwera!")

    const embed = new Discord.MessageEmbed()
        .setTitle("Informacje o serwerze")
        .addField("Nazwa serwera", guild.name)
        .addField("ID serwera", guild.id)
        .addField("Region serwera", guild.region)
        .addField("Liczba użytkowników", guild.memberCount)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "serverinfo",
    description: "Informacje o serwerze",
    category: "tools",
}