exports.run = async (client, message, args) => {
    switch (args[0]) {
        default: message.channel.send("Soon")
    }
}
exports.help = {
    name: "roulette",
    description: "Rosyjska ruletka",
    aliases: ["rr"],
    category: "economy",
}