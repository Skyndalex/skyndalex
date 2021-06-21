exports.run = (client, message, args) => {
    const user = message.mentions.users.first()||client.users.cache.get(args[0])
    if (!user) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

    let resp = [
        `Nie płacz ${user.tag}! Jestem tylko botem, nie gryze!`,
        `Płaczesz ze śmiechu czy z smutku ${user.tag}?`,
        `bEkA z niego cn ${user.tag}?`
    ]
    message.channel.send(resp.random())
}
exports.help = {
    name: "przytul",
    description: "Przytula użytkownika",
    category: "fun",
}