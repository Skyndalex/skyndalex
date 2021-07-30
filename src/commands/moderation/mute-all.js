const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender("Nie masz permisji", "", "", "RED")

    const channel = message.channel
    const members = channel.members

    if (!members) return message.channel.send("Nie znaleziono użytkówników!")
    if (!channel) return message.channel.send("Nie znaleziono kanałów!")
    
    members.forEach(member => {
            member.voice.setMute(true)
            member.voice.setDeaf(true)
    }).catch(err => {
        message.channel.send(`Błąd z: \`\`\`${err}\`\`\``)
    })

    client.sender(message, "", "Wyciszono wszystkich użytkowników na **wszystkich** dostępnych kanałów głosowych!", "", "GREEN", "", "", "")
}
exports.help = {
    name: "mute-all",
    description: "Ucisz wszystkich użytkowników na kanale głosowym",
    category: "vcmanagement",
}