exports.run = async (client, message, args, level) => {
    switch(args[0]) {
        default:
            client.sender(message, "Menu giveawai", "Chcesz utworzyć giveawaya? Świetnie! Masz taką możliwość", "", "GREEN", [
                {
                    name: "> \`giv create [czas] [co jest do wygrania] [sponsor] [kanał]\`",
                    value: "Główna komenda którą możesz utworzyć giveaway"
                },
                {
                    name: "> \`giv finish [ID wiadomości]\`",
                    value: "Zakończ giveaway"
                },
                {
                    name: "> \`giv delete [ID wiadomości]\`",
                    value: "Usuń giveaway"
                },
                {
                    name: "> \`giv reroll [ID wiadomości]\`",
                    value: "Losuje innego zwycięzce"
                },
            ])
    }
}
exports.help = {
    name: "giv",
    description: "Organizuje event",
    category: "tools",
}