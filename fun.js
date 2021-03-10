const figlet = require("figlet");
const fetch = require("node-fetch");

exports.load = (gateway, discord) => {
    gateway.command("fun", "8ball", "Magiczna kula!", "8ball (pytanie)", [], (client, msg) => {
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
    })

    gateway.command("fun", "ascii", "Wysyła tekst w ascii", "ascii (tekst)", [], (client, msg) => {
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
    })

    gateway.command("fun", "ascii-3d", "Wysyła tekst w ascii", "ascii-3d (tekst)", [], (client, msg) => {
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
    })

    gateway.command("fun", "birb", "birb", "birb", ["ptak"], (client, msg) => {
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
    })

    gateway.command("fun", "cat", "cat", "cat", ["kot"], (client, msg) => {
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
    })

    gateway.command("fun", "dog", "dog", "dog", ["pies"], (client, msg) => {
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
    })

    gateway.command("fun", "fox", "fox", "fox", ["lis"], (client, msg) => {
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
    })

    gateway.command("fun", "koala", "koala", "koala", [], (client, msg) => {
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
    })

    gateway.command("fun", "gay", "Pokazuje w ilu procentach coś jest gejem", "gay [coś]", [], (client, msg) => {
        client.args[0] = client.args[0] || msg.author.username

        discord.createMessage(msg, {
            embed: {
                description: `${client.args.join(" ")} jest gejem na ${Math.floor(Math.random() * 100)}%!`,
                color: 0x2ecc71
            }
        })
    })

    gateway.command("fun", "jbzd", "jbzd", "jbzd", [], (client, msg) => {
        discord.getChannel(msg.channel_id)
            .then(channel => {
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
    })

    gateway.command("fun", "mem", "mem", "mem", ["meme"], (client, msg) => {
        fetch("https://api.aleks.ovh/fun/meme")
            .then(resp => resp.json())
            .then(resp => {
                discord.createMessage(msg, {
                    embed: {
                        title: "Wygenerowano",
                        image: {
                            url: resp.image.link
                        },
                        footer: {
                            text: "Wygenerowano za pomocą api.aleks.ovh/fun/meme"
                        },
                        color: 0x2ecc71
                    }
                })
            })
    })

    gateway.command("fun", "nosacz", "Wysyła randomowe nosacze", "nosacz", [], (client, msg) => {
        discord.createMessage(msg, {
            embed: {
                title: "Wygenerowano",
                image: {
                    url: `https://raw.githubusercontent.com/MrBoombastic/nosaczapi-unofficial/2.1/images/${Math.floor(Math.random() * 1586)}.jpg`
                },
                color: 0x2ecc71
            }
        })
    })
    gateway.command("fun", "meme-en", "Wysyła mema z zagranicy", "meme-en", [], (client,msg) => {
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
    })

    gateway.command("fun", "ship", "ship", "ship (coś) (coś)", ["love"], (client, msg) => {
        if (!client.args[1]) return client.events.error(client, "noargs", msg);

        discord.createMessage(msg, {
            embed: {
                title: "Ship",
                description: `${client.args[0]} oraz ${client.args[1]} kochają sie na ${Math.floor(Math.random() * 100)}%!`,
                color: 0x2ecc71
            }
        })
    })

    gateway.command("fun", "nitro", "Wyszukuje emotke", "nitro (nazwa)", ["emotka"], (client, msg) => {
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
    })
}