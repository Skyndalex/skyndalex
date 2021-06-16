const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    switch (args[0]) {
        default:
            client.sender(message, "Darmowe emoji", "", "", "GREEN", [
                {
                    name: "> \`all\`",
                    value: "Łączne statystyki serwisu discordemoji.com"
                },
                {
                    name: "> \`random\`",
                    value: "Wylosuj randomową emotke z serwisu discordemoji.com"
                },
                {
                    name: "> \`info [emoji]\`",
                    value: "Informacje o podanej emotce"
                },
            ])
            break;
        case 'all':
                fetch(`https://emoji.gg/api/?request=stats`)
                    .then(res => res.json())
                    .then(json => {
                        client.sender(message, "Statystyki", "Statystyki serwisu emoji.gg", "", "GREEN", [
                            {
                                name: "Liczba dodanych emoji na strone",
                                value: json.emoji
                            },
                            {
                                name: "Liczba paczek emoji",
                                value: json.packs
                            },
                            {
                                name: "Liczba użytkowników",
                                value: json.users
                            },
                            {
                                name: "Liczba pobrań",
                                value: json.downloads
                            },
                            {
                                name: 'Oczekujących na weryfikacje',
                                value: json.pending_approvals
                            },
                            {
                                name: "Paczki oczekujące na weryfikacje",
                                value: json.pending_pack_approvals
                            },
                        ])
                    })
            break;
        case 'random':
            message.channel.send("SoonTM")
            break;
        case 'info':
            message.channel.send("SoonTM")
            break;

    }
}
exports.help = {
    name: "freeemoji",
    description: "Statystyki emotek z serwisu emoji.gg",
    category: "fun",
}