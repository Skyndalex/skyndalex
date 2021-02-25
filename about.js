const os = require("os");

exports.load = (gateway, discord) => {
    gateway.command("bot", "informacje", "informacje", "informacje", [], (client, msg) => {
        discord.createMessage(msg, {
            embed: {
                title: "Informacje o bocie",
                description: `Cześć! Jestem botem stworzonym przez Korrumz2#6892, głównie kierowanym do funkcji 4Fun. Posiadam ${Object.keys(client.commands).length} komend.`,
                fields: [
                    {
                        name: "Statystyki",
                        value: `• Serwery: ${client.guilds.length}`,
                        inline: false
                    },
                    {
                        name: "Podziękowania dla",
                        value: "• Wszystkich byłych programistów\n• Wszystkich osób które pomagały programistom\n• Moderatorów na serwerze discord\n• Wszystkich osób które wkładały chodź trochę prac w skyndalexie.",
                        inline: false
                    }
                ],
                color: 0x2ecc71
            }
        })
    })

    gateway.command("bot", "stats", "statystyki bota", "stats", [], (client, msg) => {
        let difference = Date.now() - client.uptime;

        const days = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= days * 1000 * 60 * 60 * 24;

        const hours = Math.floor(difference / 1000 / 60 / 60);
        difference -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(difference / 1000 / 60);
        difference -= minutes * 1000 * 60;

        const seconds = Math.floor(difference / 1000);

        const uptime = `${days} dni, ${hours} godzin, ${minutes} minut oraz ${seconds} sekund`;

        discord.createMessage(msg, {
            embed: {
                title: "Statystyki",
                description: `**Czas działania:** ${uptime}`,
                fields: [
                    {
                        name: "Liczba serwerów",
                        value: client.guilds.length,
                        inline: false
                    },
                    {
                        name: "Użycie pamięci RAM",
                        value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
                        inline: false
                    },
                    {
                        name: "Wersja node.js",
                        value: process.version,
                        inline: false
                    }
                ],
                color: 0x2ecc71
            }
        })
    })

    gateway.command("bot", "support", "Serwer support", "support", [], (client, msg) => {
        discord.createMessage(msg, {
            embed: {
                description: "https://discord.gg/62JVxrU6kP",
                footer: {
                    text: "Jeśli ktoś będzie wykorzystywał link do rajdów, zostanie unieważniony na 2 godziny."
                },
                color: 0x2ecc71
            }
        })
    })

    gateway.command("bot", "invite", "Zaproszenie do bota", "invite", [], (client, msg) => {
        discord.createMessage(msg, {
            embed: {
                description: "https://discord.com/api/oauth2/authorize?client_id=804694672806379521&permissions=8&scope=bot",
                color: 0x2ecc71
            }
        })
    })
}