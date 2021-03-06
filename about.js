const os = require("os");

exports.load = (gateway, discord) => {
    gateway.command("bot", "informacje", "informacje", "informacje", [], (client, msg) => {
        discord.createMessage(msg, {
            embed: {
                title: "Informacje o bocie",
                description: `Cześć! Jestem botem stworzonym przez Korrumz2#2137 oraz czubix#2202, głównie kierowanym do funkcji 4Fun. Posiadam ${Object.keys(client.commands).length} komend.`,
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
    gateway.command("bot", "open-source", "Link do repozytorium", "repo", [], (client, msg) => {
        discord.createMessage(msg, {
            embed: {
                description: "https://github.com/Korrumz2PL/skyndalex-public",
                footer: {
                    text: "Zachęcamy do nadania gwiazdki"
                },
                color: 0x2ecc71
            }
        })
    })
    gateway.command("bot", "stats", "statystyki bota", "stats", [], (client, msg) => {
        const moment = require('moment')
        moment.locale('pl')
        const os = require('os')


        let difference = Date.now() - client.uptime;

        let days = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= days * 1000 * 60 * 60 * 24;

        let hours = Math.floor(difference / 1000 / 60 / 60);
        difference -= hours * 1000 * 60 * 60;

        let minutes = Math.floor(difference / 1000 / 60);
        difference -= minutes * 1000 * 60;

        let seconds = Math.floor(difference / 1000);

        let uptime = `${days} dni, ${hours} godzin, ${minutes} minut oraz ${seconds} sekund`;

        discord.createMessage(msg, {
            embed: {
                title: "Statystyki",
                description: `**Czas działania:** ${uptime}\nStatus bota: [Kliknij](https://status.skyndalex.tk)`,
                fields: [
                    {
                        name: "Liczba serwerów",
                        value: client.guilds.length,
                        inline: false
                    },
                    {
                        name: "Użycie pamięci RAM",
                        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}`,
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

    gateway.command("bot", "ticket", "Zgłoś błąd", "ticket [treść buga]", [], (client, msg) => {
        if (!client.args[0]) return client.events.error(client, "noargs", msg);

        discord.createMessage({channel_id: "814868167746125855"}, {
            embed: {
                title: "Wysłano buga!",
                description: `${client.args.join(" ")}\nUżytkownik: ${msg.author.username}\nID: ${msg.author.id}`,
                color: 0x2ecc71
            }
        })

        discord.createMessage(msg, {
            embed: {
                description: "Wysłano",
                color: 0x2ecc71
            }
        })
    })

    gateway.command("bot", "ping", "Pokazuje ping bota", "ping", [], (client, msg) => {
        client.ping[msg.channel_id] = Date.now();

        const data = {
            op: 1,
            d: 251
        }

        client.ws.send(JSON.stringify(data));
    })
}