exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "401: No content", "Nie podano argumentu!", client.footer, "RED", "", "")

    await message.delete()
    
    message.channel.send(`Voteban ${args[0]}`).then(m => {
        m.react("👍")
        m.react("👎")
    })
}
exports.help = {
    name: "voteban",
    description: "voteban",
    category: "fun",
}