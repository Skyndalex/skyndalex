exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.ban_members.ban\`", client.footer, "RED", "", "")

    message.channel.send({content: "h"})
}
exports.help = {
    name: "ban",
    description: "Wypierdol użytkownika z serwera",
    usage: "ban [użytkownik]",
    perms: "server.ban_members.ban",
    category: "mod"
}