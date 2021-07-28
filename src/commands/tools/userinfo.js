exports.run = async (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
    
    const member = message.guild.members.cache.get(user.id)
    
    client.sender(message, "Informacje o użytkowniku", "", "", "GREEN", [
        {
            name: "Nazwa użytkownika", value: user.username
        },
        {
            name: "ID użytkownika", value: user.id
        },
        {
            name: "Pełna nazwa użytkownika", value: user.tag
        },
        {
            name: "Status", value: client.presences[user.presence.status]
        },
        {
            name: "Czy jest botem?", value: client.tof[user.bot]
        },
        {
            name: "Role", value: `\`${member.roles.cache.map(r => r.name).join(" | ")}\``
        }
    ])
}
exports.help = {
    name: "userinfo",
    description: "Informacje o użytkowniku",
    category: "tools",
}