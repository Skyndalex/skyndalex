exports.run = (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
    const member = message.guild.members.cache.get(user.id)
    
    let tof = {
        true: "Tak",
        false: "Nie"
    }

    let status = {
        online: "Dostępny",
        offline: "Niedostępny",
        idle: "Zaraz wracam",
        dnd: "Nie przeszkadzać"
    }

    client.sender(message, "Informacje o użytkowniku", "", "", "GREEN", [
        {
            name: "Nazwa użytkownika",
            value: member.user.tag 
        },
        {
            name: "Czy jest botem?",
            value: tof[member.user.bot]
        },
        {
            name: "Status",
            value: status[member.user.presence.status]
        },
        {
            name: "Role",
            value: `\`${member.roles.cache.map(r => r.name).join(" | ")}\``
        }
    ])

};

exports.help = {
    name: "whois",
    description: "Informacje o użytkowniku",
    category: "tools",
    aliases: ["userinfo"]
}