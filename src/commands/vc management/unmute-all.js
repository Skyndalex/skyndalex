const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")

    const channel = message.channel;
    const members = channel.members

    members.forEach(member => {
        member.voice.setMute(false)
        member.voice.setDeaf(false)
    });

    const embed = new Discord.MessageEmbed()
        .setDescription("Wyłączono wyciszenie na **wszystkich** kanałach głosowych.")
        .setColor("GREEN")
    message.channel.send( embed)
}
    exports.help = {
    name: "unmute-all",
    description: "Odcisz wszystkich użytkowników na kanale głosowym",
    category: "vcmanagement",
}