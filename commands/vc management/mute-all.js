const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender("401: Unauthorized", "Odmowa dostępu! \`MANAGE_CHANNELS\`", client.footer, "RED")

    const channel = message.channel
    const members = channel.members

    if (!members) return client.error(message, "Nie znaleziono")
    members.forEach(member => {
            member.voice.setMute(true)
            member.voice.setDeaf(true)
    });

    const embed = new Discord.MessageEmbed()
        .setDescription("Wyciszono wszystkich użytkowników na **wszystkich** dostępnych kanałów głosowych!")
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "mute-all",
    description: "Ucisz wszystkich użytkowników na kanale głosowym",
    category: "vcmanagement",
}