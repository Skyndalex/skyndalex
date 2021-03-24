const os = require("os");

exports.load = (gateway, discord) => {
    gateway.command({
        category: "bot",
        name: "open-source",
        description: "Link do repozytorium",
        usage: "open-source",
        aliases: [],

        run: (client, msg) => {
            discord.createMessage(msg, {
                embed: {
                    description: "https://github.com/Korrumz2PL/krivebot",
                    footer: {
                        text: "Zachęcamy do nadania gwiazdki"
                    },
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "bot",
        name: "stats",
        description: "Statystyki bota",
        usage: "stats",
        aliases: [],

        run: (client, msg) => {
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
        }
    })

    gateway.command({
        category: "bot",
        name: "support",
        description: "Serwer support",
        usage: "support",
        aliases: [],

        run: (client, msg) => {
            discord.createMessage(msg, {
                embed: {
                    description: "https://discord.gg/62JVxrU6kP",
                    footer: {
                        text: "Jeśli ktoś będzie wykorzystywał link do rajdów, zostanie unieważniony na 2 godziny."
                    },
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "bot",
        name: "invite",
        description: "Zaproszenie do bota",
        usage: "invite",
        aliases: [],

        run: (client, msg) => {
            discord.createMessage(msg, {
                embed: {
                    description: "https://discord.com/api/oauth2/authorize?client_id=804694672806379521&permissions=8&scope=bot",
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "bot",
        name: "ticket",
        description: "Zgłoś błąd",
        usage: "ticket",
        aliases: [],

        run: (client, msg) => {
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
        }
    })

    gateway.command({
        category: "bot",
        name: "ping",
        description: "Pokazuje ping bota",
        usage: "ping",
        aliases: [],

        run: (client, msg) => {
            client.ping[msg.channel_id] = Date.now();

            const data = {
                op: 1,
                d: 251
            }

            client.ws.send(JSON.stringify(data));
        }
    })
}