const Discord = require("discord.js")
exports.run = (client, message, args) => {
    client.sender(message, "Kontakt z administracją bota", "Potrzebujesz pomocy? Skontaktuj się znami za pomocą DMek lub za pomocą [\`serwera discord\`](https://krivebot.xyz/discord)", "UWAGA: Po kliknięciu w link otwiera się okno z DMką!", "GREEN", [
        {
            name: "Programiści - jeśli potrzebujesz bardziej zaawansowanej pomocy",
            value: "**→ [\`Korrumz2 (entity)\`](https://discord.com/users/817883855310684180)**"
        },
        {
            name: "Headadmini - jeśli potrzebujesz pomocy z np. konfiguracją lub coś się po prostu zepsuło",
            value: "**→ [\`Cyber\`](https://discord.com/users/682572949219180547)\n→ [\`MatStef\`](https://discord.com/users/304979757852917762)**"
        },
        {
            name: "Moderatorzy - bardziej zamknięte pytania np. Co do czego służy.",
            value: "**→ [\`Dejwidson\`](https://discord.com/users/375247025643716609)\n→ [\`rkubapl\`](https://discord.com/users/494017032283619329)\n→ [\`Inkatail\`](https://discord.com/users/829789505237024778)**"
        }
    ])
}
exports.help = {
    name: "contact",
    description: "Kontakt z admnistracją bota",
    category: "bot",
}
