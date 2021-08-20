exports.run = (client, message, args) => {
    const user = message.mentions.users.first()||client.users.cache.get(args[0])
    if (!user) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

    message.channel.send(`huli huli pup pup <@${user.id}> przytulił cię ${message.author.tag}`)
}
exports.help = {
    name: "przytul",
    description: "Przytula użytkownika",
    category: "fun",
}