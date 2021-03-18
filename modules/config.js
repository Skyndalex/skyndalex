const permissions = require("../lib/permissions.js");
const r = require("rethinkdb");

exports.load = (gateway, discord, msg) => {
    gateway.command({
        category: "config",
        name: "prefix",
        description: "Zmienia prefix na serwerze",
        usage: "prefix (prefix)",
        aliases: [],

        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author_id, "MANAGE_GUILD", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);
                const blacklist = ["\\n", "'", "\"", "`"];

                if (!client.args[0]) return client.events.error(client, "noargs", msg);
                if (blacklist.some(x => client.args[0].includes(x))) return client.events.error(client, "unknown", msg, "Nie można użyć tego znaku!");

                r.db("guilds").table("prefix").filter({guild_id: msg.guild_id}).run(client.con, (err, result) => {
                    if (!result._responses[0]) {
                        r.db("guilds").table("prefix").insert({
                            guild_id: msg.guild_id,
                            prefix: client.args[0]
                        }).run(client.con)
                    }
                });

                r.db("guilds").table("prefix").filter({guild_id: msg.guild_id}).update({prefix: client.args[0]}).run(client.con);
                client.guilds.find(x => x.id === msg.guild_id).prefix = client.args[0];

                discord.createMessage(msg, {
                    embed: {
                        description: "Zmieniono prefix",
                        color: 0x2ecc71,
                        footer: {
                            text: 'Ustawienia BETA'
                        }
                    }
                })
            })
        }
    })
    gateway.command({
        category: "config",
        name: "broadcast-channel",
        description: "Zmienia kanał ogłoszeń",
        usage: "broadcast-channel [kanał]",
        aliases: [],

        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author_id, "MANAGE_GUILD", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);

                const channel = client.guilds.find(x => x.id === msg.guild_id).channels.find(x => "<#" + x.id + ">" == client.args[0])

                r.db("settings").table("broadcastChannel").filter({guild_id: msg.guild_id}).run(client.con, (err, result) => {
                    if (!result._responses[0]) {
                        r.db("settings").table("broadcastChannel").insert({
                            guild_id: msg.guild_id,
                            broadcastChannel: channel
                        }).run(client.con)
                    }
                });

                r.db("settings").table("broadcastChannel").filter({guild_id: msg.guild_id}).update({broadcastChannel: channel}).run(client.con);
                client.guilds.find(x => x.id === msg.guild_id).broadcastChannel = channel;


                discord.createMessage(msg, {
                    embed: {
                        title: 'Ustawienia - pomyślnie ustawiono',
                        description: `Ustawiono wartość \`broadcastChannel\` przez ${msg.author.username}\nNowa wartość: <#${channel.id}>`,
                        footer: {
                            text: 'Ustawiono za pomocą bota KriveBot'
                        },
                        color: 0x2ecc71
                    }
                })
            })
        },
    })
    gateway.command({
        category: "config",
        name: "vote-channel",
        description: "Zmienia kanał głosowań na serwerze",
        usage: "vote-channel [ID kanału]",
        aliases: [],

        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author.id, "MANAGE_GUILD", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);
                if (!client.args[0]) return client.events.error(client, "noargs", msg)

                const channel = client.guilds.find(x => x.id === msg.guild_id).channels.find(x => "<#" + x.id + ">" == client.args[0])


                r.db("settings").table("voteChannel").filter({guild_id: msg.guild_id}).run(client.con, (err, result) => {
                    if (!result._responses[0]) {
                        r.db("settings").table("voteChannel").insert({
                            guild_id: msg.guild_id,
                            voteChannel: channel
                        }).run(client.con)
                    }
                });

                r.db("settings").table("voteChannel").filter({guild_id: msg.guild_id}).update({voteChannel: channel}).run(client.con);
                client.guilds.find(x => x.id === msg.guild_id).voteChannel = channel;

                discord.createMessage(msg, {
                    embed: {
                        title: "Ustawienia - pomyślnie ustawiono",
                        description: `Ustawiono wartość \`voteChannel\` przez ${msg.author.username}\nNowa wartość: <#${channel.id}>`,
                        footer: {
                            text: "Ustawiono za pomocą bota KriveBot",
                        },
                        color: 0x2ecc71
                    }
                })
            })
        }

    })
    gateway.command({
        category: "config",
        name: "complaint-channel",
        description: "Zmienia kanał skarg na serwerze",
        usage: "complaint-channel [kanał]",
        aliases: [],

        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author.id, "MANAGE_GUILD", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);
                if (!client.args[0]) return client.events.error(client, "noargs", msg)
            })

            const channel = client.guilds.find(x => x.id === msg.guild_id).channels.find(x => "<#" + x.id + ">" == client.args[0])


            r.db("settings").table("complaintChannel").filter({guild_id: msg.guild_id}).run(client.con, (err, result) => {
                if (!result._responses[0]) {
                    r.db("settings").table("complaintChannel").insert({
                        guild_id: msg.guild_id,
                        complaintChannel: channel
                    }).run(client.con)
                }
            });

            r.db("settings").table("complaintChannel").filter({guild_id: msg.guild_id}).update({complaintChannel: channel}).run(client.con);
            client.guilds.find(x => x.id === msg.guild_id).complaintChannel = channel;

            discord.createMessage(msg, {
                embed: {
                    title: "Ustawienia - pomyślnie ustawiono",
                    description: `Ustawiono wartość \`complaintChannel\` przez ${msg.author.username}\nNowa wartość: <#${channel.id}>`,
                    footer: {
                        text: "Ustawiono za pomocą bota KriveBOT"
                    },
                    color: 0x2ecc71
                }
            })
        }
    })
    gateway.command({
        category: "config",
        name: "suggestions-channel",
        description: "Zmienia kanał propozycji na serwerze",
        usage: "suggestions-channel [kanał]",
        aliases: [],

        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author.id, "MANAGE_GUILD", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);
                if (!client.args[0]) return client.events.error(client, "noargs", msg)
            })
            const channel = client.guilds.find(x => x.id === msg.guild_id).channels.find(x => "<#" + x.id + ">" == client.args[0])


            r.db("settings").table("suggestionChannel").filter({guild_id: msg.guild_id}).run(client.con, (err, result) => {
                if (!result._responses[0]) {
                    r.db("settings").table("suggestionChannel").insert({
                        guild_id: msg.guild_id,
                        suggestionChannel: channel
                    }).run(client.con)
                }
            });

            r.db("settings").table("suggestionChannel").filter({guild_id: msg.guild_id}).update({suggestionChannel: channel}).run(client.con);
            client.guilds.find(x => x.id === msg.guild_id).suggestionChannel = channel;

            discord.createMessage(msg, {
                embed: {
                    title: "Ustawienia - pomyślnie ustawiono",
                    description: `Ustawiono wartość \`suggestionChannel\` przez ${msg.author.username}\nNowa wartość: <#${channel.id}>`,
                    footer: {
                        text: "Ustawiono za pomocą bota KriveBot",
                    },
                    color: 0x2ecc71
                }
            })
        }
    })
    gateway.command({
        category: "config",
        name: "private-mod-channel",
        description: "Zmienia kanał moderacyjny na serwerze",
        usage: "private-mod-channel [Kanał]",
        aliases: [],

        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author.id, "MANAGE_GUILD", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);
                if (!client.args[0]) return client.events.error(client, "noargs", msg)
            })

            const channel = client.guilds.find(x => x.id === msg.guild_id).channels.find(x => "<#" + x.id + ">" == client.args[0])


            r.db("settings").table("privateModChannel").filter({guild_id: msg.guild_id}).run(client.con, (err, result) => {
                if (!result._responses[0]) {
                    r.db("settings").table("privateModChannel").insert({
                        guild_id: msg.guild_id,
                        privateModChannel: channel
                    }).run(client.con)
                }
            });

            r.db("settings").table("privateModChannel").filter({guild_id: msg.guild_id}).update({privateModChannel: channel}).run(client.con);
            client.guilds.find(x => x.id === msg.guild_id).privateModChannel = channel;

            discord.createMessage(msg, {
                embed: {
                    title: "Ustawienia - ustawiono pomyślnie",
                    description: `Ustawiono wartość \`privateModChannel\` przez ${msg.author.username}\nNowa wartość: <#${channel.id}>`,
                    footer: {
                        text: "Ustawiono za pomocą bota KriveBot"
                    },
                    color: 0x2ecc71
                }
            })
        }
    })

}