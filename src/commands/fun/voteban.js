exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "401: No content", "Nie podano argumentu!", client.footer, "RED", "", "")

    await message.react('👍')
    await message.react('👎')
}
exports.help = {
    name: "voteban",
    description: "voteban",
    category: "fun",
}