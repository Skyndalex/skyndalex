const permissions = require("../lib/permissions.js");
const r = require("rethinkdb");

exports.load = (gateway, discord) => {
    gateway.command({
        category: "config",
        name: "prefix",
        description: "Zmienia prefix na serwerze",
        usage: "prefix (prefix)",
        aliases: [],
        
        run: (client, msg) => {
            permissions.hasPermission(msg, msg.author.id, "MANAGE_GUILD", (result) => {
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
}