const permissions = require("../lib/permissions.js");

exports.load = (gateway, discord) => {
    gateway.command({
        category: "mod",
        name: "purge",
        description: "Czyści wiadomości z kanału",
        usage: "purge [liczba wiadomości]",
        aliases: ["clear"],
        
        run: (client, msg) => {
            client.args[0] = client.args[0] || "100";

            permissions.hasPermission(msg, msg.author.id, "MANAGE_MESSAGES", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);

                discord.getMessages(msg.channel_id, client.args[0]).then(messages => {
                    messages = messages.map(x => x.id);
                    discord.bulkDeleteMessages(msg.channel_id, {messages:messages});
                    
                    discord.createMessage(msg, {
                        embed: {
                            description: "Usunięto wiadomości",
                            color: 0x2ecc71
                        }
                    })
                })
            })
        }
    })

    gateway.command({
        category: "mod",
        name: "kick",
        description: "Wywala osobe z serwera",
        usage: "kick (osoba) [powód]",
        aliases: [],
        
        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author.id, "KICK_MEMBERS", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);
                if (!msg.mentions[0]) return client.events.error(client, "noargs", msg);
    
                client.args = client.args.slice(1).join(" ") || "nie podano powodu";
    
                discord.kickMember(msg.guild_id, msg.mentions[0].id);
    
                discord.createMessage(msg, {
                    embed: {
                        title: `Wyrzucono ${msg.mentions[0].username}`,
                        fields: [
                            {
                                name: "Wyrzucił",
                                value: msg.author.username,
                                inline: false
                            },
                            {
                                name: "Powód",
                                value: client.args,
                                inline: false
                            }
                        ],
                        color: 0x2ecc71
                    }
                })
            })
        }
    })

    gateway.command({
        category: "mod",
        name: "ban",
        description: "Banuje osobe na serwerze",
        usage: "ban (osoba) [powód]",
        aliases: [],
        
        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author.id, "BAN_MEMBERS", (result) => {
                if (!result) return client.events.error(client, "nopermission", msg);
                if (!msg.mentions[0]) return client.events.error(client, "noargs", msg);
    
                client.args = client.args.slice(1).join(" ") || "nie podano powodu";
    
                discord.banMember(msg.guild_id, msg.mentions[0].id, client.args, "7");
    
                discord.createMessage(msg, {
                    embed: {
                        title: `Zbanowano ${msg.mentions[0].username}`,
                        fields: [
                            {
                                name: "Zbanował",
                                value: msg.author.username,
                                inline: false
                            },
                            {
                                name: "Powód",
                                value: client.args,
                                inline: false
                            }
                        ],
                        color: 0x2ecc71
                    }
                })
            })
        }
    })
}