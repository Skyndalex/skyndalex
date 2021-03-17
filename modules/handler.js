exports.load = (gateway, discord) => {
    gateway.event("error", (client, error, msg, text) => {
        client.bot.then(bot => {
            const errors = {
                commandnotfound: "Nie znaleziono takiej komendy",
                noargs: `Poprawne użycie komendy to \`${client.command.usage}\``,
                cooldown: "Musisz poczekać 3 sekundy przed użyciem komendy",
                nsfw: "Kanał musi być nsfw",
                nopermission: "Nie masz uprawnień",
                gban: "Posiadasz blokade",
                notfound: "Nie znaleziono",
                beta: 'Komenda jest niedostępna!',
                unknown: text
            }

            discord.createMessage(msg, {
                embed: {
                    title: "Błąd!",
                    description: errors[error],
                    color: 0xe74c3c,
                    footer: {
                        text: "Błąd || Krive v1",
                        icon_url: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
                    }
                }
            })
        })
    })
}