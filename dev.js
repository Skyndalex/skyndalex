const r = require("rethinkdb");

exports.load = (gateway, discord) => {
    const owners = ["509014773006991376", "636096693712060416"];

    gateway.command("dev", "eval", "eval", "eval (kod)", [], (client, msg) => {
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
    })

    gateway.command("dev", "gban", "gban", "gban (użytkownik)", [], (client, msg) => {
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
    })

    gateway.command("dev", "ungban", "ungban", "ungban (użytkownik)", [], (client, msg) => {
        if (!owners.includes(msg.author.id)) return client.events.error(client, "nopermission", msg);
        const user = msg.mentions[0];

        r.db("users").table("users").filter({user_id: user.id}).update({gban: false}).run(client.con);

        discord.createMessage(msg, {
            embed: {
                description: `Usunięto gbana użytkownikowi ${user.username}`,
                color: 0x2ecc71
            },
        })
    })
}