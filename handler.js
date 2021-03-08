exports.load = (gateway, discord) => {
    gateway.event("error", (client, error, msg, text) => {
        discord.getCurrentUser().then(bot => {
            function responseText(errorMessage) {
                discord.createMessage(msg, {
                    embed: {
                        title: "Błąd!",
                        description: errorMessage,
                        color: 0xe74c3c,
                        footer: {
                            text: "Błąd || Krive v1",
                            icon_url: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
                        }
                    }
                })
            }

            switch (error) {
                case "commandnotfound":
                    responseText("Nie znaleziono takiej komendy");
                    break;

                case "noargs":
                    responseText(`Poprawne użycie komendy to \`${client.command.usage}\``);
                    break;

                case "cooldown":
                    responseText("Musisz poczekać 3 sekundy przed użyciem komendy");
                    break;

                case "nsfw":
                    responseText("Kanał musi być nsfw");
                    break;

                case "nopermission":
                    responseText("Nie masz uprawnień");
                    break;

                case "gban":
                    responseText("Masz gbana");
                    break;

                case "unknown":
                    responseText(text);
                    break;
            }
        })
    })
}