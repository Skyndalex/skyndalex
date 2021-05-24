const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    switch (args[0]) {
        default:
            client.sender(message, "Ustawienia logów serwerowych", "Potrzebujesz logów? Trafiłeś w idealne miejsce!", "Ustawienia logów: logs channelCreate #kanał", "GREEN", [
                {
                    name: "> \`channelCreate\`",
                    value: "Logi - tworzenie kanałów",
                },
                {
                    name: "> \`channelDelete\`",
                    value: "Logi - usuwanie kanałów"
                },
                {
                    name: "> \`channelUpdate\`",
                    value: "Logi - aktualizowanie kanału"
                },
                {
                    name: "> \`emojiCreate\`",
                    value: "Logi - tworzenie emotki"
                },
                {
                    name: "> \`emojiDelete\`",
                    value: "Logi - usuwanie emotki"
                },
                {
                    name: "> \`guildBanAdd\`",
                    value: "Logi - nadawanie bana"
                },
                {
                    name: "> \`guildBanRemove\`",
                    value: "Logi - usuwanie bana"
                },
                {
                    name: "> \`guildMemberUpdate\`",
                    value: "Logi - aktualizacja użytkownika"
                },
                {
                    name: "> \`guildUpdate\`",
                    value: "Logi - aktualizowanie serwera"
                },
                {
                    name: "> \`inviteCreate\`",
                    value: "Logi - tworzenie zaproszenia"
                },
                {
                    name: "> \`inviteDelete\`",
                    value: "Logi - usuwanie zaproszenia"
                },
                {
                    name: "> \`messageDelete\`",
                    value: "Logi - usuwanie wiadomości"
                },
                {
                    name: "> \`messageDeleteBulk\`",
                    value: "Logi - usuwanie wiadomości komendą"
                },
                {
                    name: "> \`roleCreate\`",
                    value: "Logi - tworzenie roli"
                },
                {
                    name: "> \`roleDelete\`",
                    value: "Logi - usuwanie roli"
                },
                {
                    name: "> \`roleUpdate\`",
                    value: "Logi - aktualizowanie roli"
                },
            ])
    }
}
exports.help = {
    name: "logs",
    description: "Ustawienia logów serwerowych",
    category: "tools",
}