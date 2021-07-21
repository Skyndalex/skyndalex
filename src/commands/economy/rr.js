exports.run = async (client, message, args) => {
    switch (args[0]) {
        default:
            client.sender(message, "Rozpocznij ruletkę", "\`black/red\` - Mnożnik: x2\n\`Odd/Even\` - Mnożnik: x2\n\`Dozens (1-12, 13-24, 25-36)\` - Mnożnik: x3", "", "GREEN", [
                {
                    name: "Jak rozpocząć?",
                    value: "Użycie: \`rr [przestrzeń] [ilość monet]\`"
                }
            ])
            break;

            case 'black': message.channel.send("W trakcie prac!")
            case 'red': message.channel.send("W trakcie prac!")
            case 'Odd': message.channel.send("W trakcie prac!")
            case 'Even': message.channel.send("W trakcie prac!")
            case '1-12': message.channel.send("W trakcie prac!")
            case '13-24': message.channel.send("W trakcie prac!")
            case '23-56': message.channel.send("W trakcie prac!")

    }
}
exports.help = {
    name: "roulette",
    description: "Rosyjska ruletka",
    aliases: ["rr"],
    category: "economy",
}