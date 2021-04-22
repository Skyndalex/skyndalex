const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, "Nie podano argumentów!")

    const user = message.mentions.users.first().id||client.users.cache.get(args[0]).id

    if (!user) return client.error(message, "Nie znaleziono użytkownika.")

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return client.error(message, "Nie ma użytkownika na kanale głosowym!")


    const embed = new Discord.MessageEmbed()
        .setTitle("Wyrzucono użytkownika z kanału głosowego!")
        .addField("Wyrzucił", message.author.tag)
        .addField("Wyrzucono", user.tag)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "vckick",
    description: "Wyrzuć użytkownika z kanału głosowego",
    category: "vcmanagement",
}