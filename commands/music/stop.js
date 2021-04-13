const Discord = require("discord.js")
exports.run = async (client, message, args) => {

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return client.error(message, "Musisz być na kanale głosowym, aby użyć tej komendy!")

    const leave = await message.member.voice.channel.leave()

    const embed = new Discord.MessageEmbed()
        .setDescription("Wyszłem z kanału!")
        .setColor("RED")
    message.channel.send(embed)
}
exports.help = {
    name: "stop",
    aliases: ["stopujbosasiadsiewkurwiabomamtakizajebistysoundbarxdddd"],
    category: "music",
}