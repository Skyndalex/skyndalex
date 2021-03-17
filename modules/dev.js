const r = require("rethinkdb");

exports.load = (gateway, discord) => {
    const owners = ["509014773006991376", "636096693712060416"];

    gateway.command({
        category: "dev",
        name: "eval",
        description: "eval",
        usage: "eval (kod)",
        aliases: [],

        run: (client, msg) => {
            if (!owners.includes(msg.author.id)) return client.events.error(client, "nopermission", msg);

            let result;

            try {
                result = eval(client.args.join(" "))
            } catch(e) {
                result = e
            }

            discord.createMessage(msg, {
                content: `\`\`\`${result}\`\`\``
            })
        }
    })

    gateway.command({
        category: "dev",
        name: "gban",
        description: "gban",
        usage: "gban (użytkownik)",
        aliases: [],
        
        run: (client, msg) => {
            if (!owners.includes(msg.author.id)) return client.events.error(client, "nopermission", msg);
            const user = msg.mentions[0];

            r.db("users").table("users").filter({guild_id: msg.guild_id}).run(client.con, (err, result) => {
                if (!result._responses[0]) {
                    r.db("users").table("users").insert({
                        user_id: user.id,
                        gban: true
                    }).run(client.con)
                }
            })

            discord.createMessage(msg, {
                embed: {
                    description: `Dodano gbana dla ${user.username}`,
                    color: 0x2ecc71
                },
            })
        }
    })

    gateway.command({
        category: "dev",
        name: "ungban",
        description: "ungban",
        usage: "ungban (użytkownik)",
        aliases: [],
        
        run: (client, msg) => {
            if (!owners.includes(msg.author.id)) return client.events.error(client, "nopermission", msg);
            const user = msg.mentions[0];
    
            r.db("users").table("users").filter({user_id: user.id}).update({gban: false}).run(client.con);
    
            discord.createMessage(msg, {
                embed: {
                    description: `Usunięto gbana użytkownikowi ${user.username}`,
                    color: 0x2ecc71
                },
            })
        }
    })
}