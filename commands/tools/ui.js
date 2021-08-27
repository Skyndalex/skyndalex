exports.run = (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
    if (!user) return client.sender(message, "Błąd!", "Nie podałeś użytkownika!", "", "RED", "", "", "") 

    let bot = {
        true: "Tak",
        false: "Nie"
    }
    const member = message.guild.members.cache.get(user.id)

    client.sender(message, ``, ``, `Informacje o użytkowniku`, `ORANGE`, [
        {
            name: "Nazwa i tag", value: user.tag 
        },
        {
            name: "ID", value: user.id 
        },
        {
            name: "Czy jest botem?", value: bot[user.bot]
        },
        {
            name: "Role", value: `\`${member.roles.cache.map(r => r.name).join(" | ")}\``
        }
    ])
}
exports.help = {
    name: "ui",
    usage: "ui",
    perms: "global.send_messages.userinfo",
    category: "tools",
    description: "Informacje o użytkowniku",
}