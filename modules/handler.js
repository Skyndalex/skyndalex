exports.load = (gateway, discord) => {
    gateway.event("error", (client, error, msg, text) => {
        client.bot.then(bot => {
            const errors = {
                noargs: `Poprawne użycie komendy to \`${client.commands.usage}\``,
                nsfw: "Kanał musi być nsfw",
                nopermission: "Nie masz uprawnień",
                gban: "Posiadasz blokade",
                notfound: "Nie znaleziono",
                beta: 'Komenda jest niedostępna!',
                notconfigured: 'Nie ustawiono wartości przez administracje serwera!',
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