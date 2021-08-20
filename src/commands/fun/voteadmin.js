exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "401: No content", "Nie podano argumentu!", client.footer, "RED", "", "")

    await message.delete()
    
    message.channel.send(`Voteadmin ${args[0]}`).then(m => {
        m.react("👍")
        m.react("👎")
    })
}
exports.help = {
    name: "voteadmin",
    description: "voteadmin",
    category: "fun",
}