const figlet = require("figlet");
const fetch = require("node-fetch");

exports.load = (gateway, discord) => {
    gateway.command({
        category: "fun",
        name: "8ball",
        description: "Magiczna kula",
        usage: "8ball (pytanie)",
        aliases: [],
        
        run: (client, msg) => {
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            let answers = [
                "Tak",
                "Nie",
                "Być może",
                "Chyba tak",
                "Chyba nie"
            ]

            discord.createMessage(msg, {
                embed: {
                    title: "Magiczna kula",
                    fields: [
                        {
                            name: "Twoje pytanie",
                            value: client.args.join(" "),
                            inline: false
                        },
                        {
                            name: "Odpowiedź",
                            value: answers[Math.floor(Math.random() * answers.length)],
                            inline: false
                        }
                    ],
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "fun",
        name: "ascii",
        description: "Wysyła tekst w ascii",
        usage: "ascii (tekst)",
        aliases: [],
        
        run: (client, msg) => {
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            figlet(client.args.join(" "), (err, data) => {
                discord.createMessage(msg, {
                    embed: {
                        title: "Wygenerowano",
                        description: `\`\`\`${data}\`\`\``,
                        footer: {
                            text: "Skyndalex - generator tekstu ascii."
                        },
                        color: 0x2ecc71
                    }
                })
            })
        }
    })

    gateway.command({
        category: "fun",
        name: "ascii-3d",
        description: "Wysyła tekst ascii",
        usage: "ascii-3d (tekst)",
        aliases: [],
        
        run: (client, msg) => {
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            figlet(client.args.join(" "), {
                font: "Larry 3D",
                horizontalLayout: "default",
                verticalLayout: "default",
                width: 80,
                whitespaceBreak: true
            }, (err, data) => {
                discord.createMessage(msg, {
                    embed: {
                        title: "Wygenerowano",
                        description: `\`\`\`${data}\`\`\``,
                        footer: {
                            text: "Skyndalex - generator tekstu ascii."
                        },
                        color: 0x2ecc71
                    }
                })
            })
        }
    })

    gateway.command({
        category: "fun",
        name: "bird",
        description: "ptok",
        usage: "bird",
        aliases: [],
        
        run: (client, msg) => {
            fetch("https://some-random-api.ml/img/birb")
                .then(resp => resp.json())
                .then(resp => {
                    discord.createMessage(msg, {
                        embed: {
                            title: "Wygenerowano",
                            image: {
                                url: resp.link
                            },
                            color: 0x2ecc71
                        }
                    })
                })
        }
    })

    gateway.command({
        category: "fun",
        name: "kaczkoland",
        description: "Pokazuje statystyki gracza",
        usage: "kaczkoland (gracz)",
        aliases: [],
        
        run: (client, msg) => {
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            fetch("https://api.kaczkoland.pl/all")
                .then(res => res.json())
                .then(req => {
                    const r = req.find(q => q.username === client.args[0]);
                    if (!r) return client.events.error(client, "notfound", msg);

                    let fields = [];

                    const cycki = {
                        username: "Nazwa gracza",
                        mined_diamonds: "Wykopane diamenty",
                        primary_rank: "Ranga",
                        player_kills: "Zabici gracze",
                        sent_messages: "Wysłanych wiadomości",
                        crafted_items: "Scraftowanych itemów",
                        placed_blocks: "Położonych bloków",
                        deaths: "Śmierci"
                    }

                    for (x in cycki) {
                        fields.push({
                            name: cycki[x],
                            value: r[x],
                            inline: false
                        })
                    }

                    discord.createMessage(msg, {
                        embed: {
                            title: "Statystyki gracza na serwerze kaczkoland.pl",
                            description: `Wyświetlam statystyki dla gracza: ${r.username}`,
                            fields: fields,
                            color: 0x2ecc71
                        },
                    })
                })
        }
    })

    gateway.command({
        category: "fun",
        name: "cat",
        description: "kot",
        usage: "cat",
        aliases: ["kot"],
        
        run: (client, msg) => {
            fetch("https://some-random-api.ml/img/cat")
                .then(resp => resp.json())
                .then(resp => {
                    discord.createMessage(msg, {
                        embed: {
                            title: "Wygenerowano",
                            image: {
                                url: resp.link
                            },
                            color: 0x2ecc71
                        }
                    })
                })
        }
    })

    gateway.command({
        category: "fun",
        name: "dog",
        description: "pies",
        usage: "dog",
        aliases: ["pies"],
        
        run: (client, msg) => {
            fetch("https://some-random-api.ml/img/dog")
                .then(resp => resp.json())
                .then(resp => {
                    discord.createMessage(msg, {
                        embed: {
                            title: "Wygenerowano",
                            image: {
                                url: resp.link
                            },
                            color: 0x2ecc71
                        }
                    })
                })
        }
    })

    gateway.command({
        category: "fun",
        name: "fox",
        description: "lis",
        usage: "fox",
        aliases: ["lis"],
        
        run: (client, msg) => {
            fetch("https://some-random-api.ml/img/fox")
                .then(resp => resp.json())
                .then(resp => {
                    discord.createMessage(msg, {
                        embed: {
                            title: "Wygenerowano",
                            image: {
                                url: resp.link
                            },
                            color: 0x2ecc71
                        }
                    })
                })
        }
    })

    gateway.command({
        category: "fun",
        name: "koala",
        description: "koala",
        usage: "koala",
        aliases: [],
        
        run: (client, msg) => {
            fetch("https://some-random-api.ml/img/koala")
                .then(resp => resp.json())
                .then(resp => {
                    discord.createMessage(msg, {
                        embed: {
                            title: "Wygenerowano",
                            image: {
                                url: resp.link
                            },
                            color: 0x2ecc71
                        }
                    })
                })
        }
    })

    gateway.command({
        category: "fun",
        name: "gay",
        description: "Pokazule w ilu procentach coś jest gejem",
        usage: "gay [coś]",
        aliases: [],
        
        run: (client, msg) => {
            client.args[0] = client.args[0] || msg.author.username

            discord.createMessage(msg, {
                embed: {
                    description: `${client.args.join(" ")} jest gejem na ${Math.floor(Math.random() * 100)}%!`,
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "fun",
        name: "jbzd",
        description: "Wysyła losowe memy z jbzd",
        usage: "jbzd",
        aliases: [],
        
        run: (client, msg) => {
            discord.getChannel(msg.channel_id).then(channel => {
                if (!channel.nsfw) return client.events.error(client, "nsfw", msg);

                fetch("https://cenzurabot.pl/api/memes/jbzd")
                    .then(resp => resp.json())
                    .then(resp => {
                        discord.createMessage(msg, {
                            embed: {
                                title: "Wygenerowano",
                                image: {
                                    url: resp.meme
                                },
                                footer: {
                                    text: "Wygenerowano za pomocą cenzurabot.pl/api/memes"
                                },
                                color: 0x2ecc71
                            }
                        })
                    })
            })
        }
    })

    gateway.command({
        category: "fun",
        name: "mem",
        description: "mem",
        usage: "mem",
        aliases: ["meme"],
        
        run: (client, msg) => {
            fetch("https://cenzurabot.pl/api/memes/kwejk")
                .then(resp => resp.json())
                .then(resp => {
                    discord.createMessage(msg, {
                        embed: {
                            title: "Wygenerowano",
                            image: {
                                url: resp.meme
                            },
                            footer: {
                                text: "Wygenerowano za pomocą API cenzurabot.pl/api/memes/kwejk"
                            },
                            color: 0x2ecc71
                        }
                    })
                })
        }
    })

    gateway.command({
        category: "fun",
        name: "nosacz",
        description: "Wysyła randomowe nosacze",
        usage: "nosacz",
        aliases: [],
        
        run: (client, msg) => {
            discord.createMessage(msg, {
                embed: {
                    title: "Wygenerowano",
                    image: {
                        url: `https://raw.githubusercontent.com/MrBoombastic/nosaczapi-unofficial/2.1/images/${Math.floor(Math.random() * 1586)}.jpg`
                    },
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "fun",
        name: "meme-en",
        description: "Wysyła mema z zagranicy",
        usage: "meme-en",
        aliases: [],
        
        run: (client, msg) => {
            fetch("https://some-random-api.ml/meme")
                .then(resp => resp.json())
                .then(resp => {
                    discord.createMessage(msg, {
                        embed: {
                            title: "Wygenerowano",
                            image: {
                                url: resp.image,
                            },
                            color: 0x2ecc71
                        }
                    })
                })
        }
    })

    gateway.command({
        category: "fun",
        name: "ship",
        description: "ship",
        usage: "ship",
        aliases: ["love"],
        
        run: (client, msg) => {
            if (!client.args[1]) return client.events.error(client, "noargs", msg);

            discord.createMessage(msg, {
                embed: {
                    title: "Ship",
                    description: `${client.args[0]} oraz ${client.args[1]} kochają sie na ${Math.floor(Math.random() * 100)}%!`,
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "fun",
        name: "nitro",
        description: "Wyszukuje emotke",
        usage: "nitro (nazwa)",
        aliases: ["emotka"],
        
        run: (client, msg) => {
            let emoji;
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            emoji = client.guilds.find(x => x.emojis.find(x => x.name === client.args[0]));
            if (!emoji) return client.events.error(client, "unknown", msg, "Nie znaleziono takiej emotki");

            emoji = emoji.emojis.find(x => x.name === client.args[0]);
            let emoji_name = `<:${emoji.name}:${emoji.id}>`;

            if (emoji.animated) emoji_name = `<a:${emoji.name}:${emoji.id}>`;

            discord.createMessage(msg, {
                content: emoji_name
            })
        }
    })
}
