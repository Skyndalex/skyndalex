const moment = require("moment");
moment.locale("pl");

exports.load = (gateway, discord) => {
    gateway.command({
        category: "tools",
        name: "einfo",
        description: "Pokazuje informacje o emotce",
        usage: "einfo (nazwa emotki)",
        aliases: ["emojiinfo"],
        
        run: (client, msg) => {
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            const emoji = client.guilds.find(x => x.emojis.find(x => x.name === client.args[0])).emojis.find(x => x.name === client.args[0]);
            if (!emoji) return client.events.error(client, "unknown", msg, "Nie znaleziono takiej emotki");

            discord.createMessage(msg, {
                embed: {
                    title: "Informacje o emotce",
                    fields: [
                        {
                            name: "Nazwa emotki",
                            value: emoji.name,
                            inline: false
                        },
                        {
                            name: "ID emotki",
                            value: emoji.id,
                            inline: false,
                        },
                        {
                            name: "Link do emoji",
                            value: `[Pobierz](https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1})`,
                            inline: false
                        },
                        {
                            name: "Wygląd",
                            value: `<:${emoji.name}:${emoji.id}>`,
                            inline: false
                        }
                    ],
                    description: `Wyświetlam informacje o emotce: ${emoji.name}`,
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "tools",
        name: "userinfo",
        description: "Pokazuje informacje o użytkowniku",
        usage: "userinfo [osoba]",
        aliases: [],
        
        run: (client, msg) => {
            msg.mentions[0] = msg.mentions[0] || msg.author;

            discord.getGuild(msg.guild_id).then(guild => {
                discord.getGuildMember(msg.guild_id, msg.mentions[0].id).then(member => {
                    const roles = member.roles.map(role => guild.roles.find(x => x.id == role).name);
                    let created = moment(member.joined_at).format("LLLL")

                    discord.createMessage(msg, {
                        embed: {
                            title: `Informacje o ${msg.mentions[0].username}`,
                            fields: [
                                {
                                    name: "ID",
                                    value: msg.mentions[0].id,
                                    inline: false
                                },
                                {
                                    name: "Nick z tagiem",
                                    value: msg.mentions[0].username + "#" + msg.mentions[0].discriminator,
                                    inline: false
                                },
                                {
                                    name: "Role",
                                    value: roles.join(", "),
                                    inline: false
                                },
                                {
                                    name: "Dołączył na serwer",
                                    value: created,
                                    inline: false
                                }
                            ],
                            thumbnail: {
                                url: `http://cdn.discordapp.com/avatars/${msg.mentions[0].id}/${msg.mentions[0].avatar}.png?size=2048`
                            },
                            color: 0x2ecc71
                        }
                    })
                })
            })
        }
    })

    gateway.command({
        category: "tools",
        name: "serverinfo",
        description: "Pokazuje informacje o serwerze",
        usage: "serverinfo [id serwera]",
        aliases: [],
        
        run: (client, msg) => {
            client.args[0] = client.args[0] || msg.guild_id;

            discord.getGuild(client.args[0])
                .then(guild => {
                    if (!guild) return client.events.error(client, "unknown", msg, "Nie mogłem znaleźć tego serwera");

                    discord.getGuildMembers(client.args[0]).then(members => {
                        discord.getGuildChannels(client.args[0]).then(channels => {
                            discord.createMessage(msg, {
                                embed: {
                                    title: `Informacje o ${guild.name}`,
                                    fields: [
                                        {
                                            name: "Właściciel",
                                            value: `<@${guild.owner_id}> (${guild.owner_id})`,
                                            inline: false
                                        },
                                        {
                                            name: "ID",
                                            value: client.args[0],
                                            inline: false
                                        },
                                        {
                                            name: "Ilość osób",
                                            value: members.length,
                                            inline: false
                                        },
                                        {
                                            name: "Ilość kanałów",
                                            value: channels.length,
                                            inline: false
                                        },
                                        {
                                            name: "Ilość ról",
                                            value: guild.roles.length,
                                            inline: false
                                        },
                                        {
                                            name: "Ilość emotek",
                                            value: guild.emojis.length,
                                            inline: false
                                        },
                                        {
                                            name: "Boosty",
                                            value: `${guild.premium_subscription_count} boosty / ${guild.premium_tier} poziom`,
                                            inline: false
                                        }
                                    ],
                                    thumbnail: {
                                        url: `https://cdn.discordapp.com/icons/${client.args[0]}/${guild.icon}.png?size=2048`
                                    },
                                    color: 0x2ecc71
                                }
                            })
                        })
                    })
                })
        }
    })

    gateway.command({
        category: "tools",
        name: "broadcast",
        description: "Wysyła ogłoszenie na kanał",
        usage: "broadcast (ogłoszenie)",
        aliases: ["ogloszenie"],
        
        run: (client, msg) => {
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            const channeltosend = client.guilds.find(x => x.id == msg.guild_id).broadcastChannel;
            if (!channeltosend) return client.events.error(client, 'notconfigured', msg)
            discord.createMessage({channel_id: channeltosend.id}, {
                embed: {
                    title: "Nowe ogłoszenie!",
                    description: client.args.join(' '),
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "tools",
        name: "suggest",
        description: "Zaproponuj coś",
        usage: "suggest (propozycja)",
        aliases: ["sugestia", "propozycja"],
        
        run: (client, msg) => {
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            discord.createMessage(msg, {
                embed: {
                    title: "Nowa propozycja!",
                    description: client.args.join(" "),
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "tools",
        name: "ask",
        description: "Zadaj pytanie",
        usage: "ask (pytanie)",
        aliases: ["pytanie"],
        
        run: (client, msg) => {
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            discord.createMessage(msg, {
                embed: {
                    title: "Zadano pytanie",
                    description: client.args.join(" "),
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "tools",
        name: "complaint",
        description: "Wysyła skarge na użytkownika",
        usage: "complaint (osoba) (powód)",
        aliases: ["report"],
        
        run: (client, msg) => {
            if (!(msg.mentions[0] || client.args[1])) return client.events.error(client, "noargs", msg);

            discord.createMessage(msg, {
                embed: {
                    title: "Dodano skargę!",
                    fields: [
                        {
                            name: "Złożył skargę:",
                            value: msg.author.username,
                            inline: false
                        },
                        {
                            name: "Zgłoszono:",
                            value: msg.mentions[0].username,
                            inline: false
                        },
                        {
                            name: "Powód:",
                            value: client.args.slice(1).join(" "),
                            inline: false
                        }
                    ],
                    color: 0x2ecc71
                }
            })
        }
    })

    gateway.command({
        category: "tools",
        name: "vote",
        description: "Głosowanie",
        usage: "vote (tekst)",
        aliases: ["zaglosuj"],
        
        run: (client, msg) => {
            // to fix
            if (!client.args[0]) return client.events.error(client, "noargs", msg);

            const votechannelsended = client.guilds.find(x => x.id == msg.guild_id).voteChannel;
            if (!votechannelsended) return client.events.error(client, 'notconfigured', msg)

            discord.getCurrentUser().then(bot => {
                discord.createMessage(msg, {channel_id: votechannelsended}, {
                    embed: {
                        author: {
                            name: msg.author.username + "#" + msg.author.discriminator,
                            icon_url: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`
                        },
                        title: "Dodano głosowanie!",
                        description: client.args.join(' '),
                        footer: {
                            text: "Głosowanie wygenerowane przez bota skyndalex",
                            icon_url: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
                        },
                        color: 0x2ecc71
                    }
                }).then(botMsg => {
                    discord.createReaction(votechannelsended, botMsg.id, "%F0%9F%91%8D");
                    setTimeout(() => discord.createReaction(votechannelsended, botMsg.id, "%F0%9F%91%8E"), 500);
                })
            })
        }
    })
}