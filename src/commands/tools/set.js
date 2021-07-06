exports.run = (client, message, args) => {
    switch (args[0]) {
        default: 
        client.sender(message, "Ustawienia serwerowe - menu", "Witaj w ustawieniach serwerowych!\n[Dokumentacja](https://docs.krivebot.xyz)", "", "GREEN", [
            {
                name: "Ustawienia kanałów",
                value: "\`set ch\`"
            },
            {
                name: "Ustawienia ról",
                value: "\`set roles\`"
            },
            {
                name: "Ustawienia bota",
                value: "\`set bot\`"
            },
            {
                name: "Ustawienia logów",
                value: "\`logs\`"
            }
        ])
        break;
        case 'ch':
            client.sender(message, "Ustawienia - kanały", "Lista ustawień kanałów [PORADNIK](https://docs.krivebot.xyz)", "", "GREEN", [
                {
                    name: "Kanał ogłoszeń",
                    value: "BRAK."
                }
            ])
            break;
    }
};

exports.help = {
    name: "set",
    description: "Ustawienia serwera",
    category: "tools",
    aliases: ["ustaw"]
}