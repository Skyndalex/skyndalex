const ytdl = require("ytdl-core");
const Discord = require("discord.js")
exports.run = async (client, message, args) => {

    let usersWhoCanUseMusic = [
        "817883855310684180",
        "406085770018029568"
    ]
    if (!usersWhoCanUseMusic.includes(message.author.id)) return client.error(message, "Ta komenda została stworzona na użytek prywatny! Wkrótce będzie publiczna.")

    if (!args[0]) return client.error(message, "Nie podano argumentów!")

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return client.error(message, "Musisz być na kanale głosowym, aby użyć tej komendy!")

    const permissions = voiceChannel.permissionsFor(message.client.user)

    if (!permissions.has("CONNECT")) return client.error(message, "Nie posiadasz permisji \`CONNECT\`")
    if (!permissions.has("SPEAK")) return client.error(message, "Nie posiadasz permisji \`SPEAK\`")


    const connection = await message.member.voice.channel.join()


    const playedEmbed = new Discord.MessageEmbed()
        .setDescription("Pomyślnie odtworzono muzykę")
        .addField("Przez", message.author.tag)
        .addField("Nazwa", args.join(" "))
        .setColor("GREEN")
    message.channel.send(playedEmbed)

    const dispatcher = connection.play(ytdl(args.join(" ")));


    dispatcher.setVolume(100)

    const embede = new Discord.MessageEmbed()
        .setDescription("Skończyłem odtwarzać muzykę.")
        .setColor("GREEN")

    dispatcher.on('finish', async() => {
        await message.member.voice.channel.leave()
        message.channel.send(embede)

    });

}
exports.help = {
    name: "play",
    aliases: ["grajmitokurwa"],
    category: "music",
}