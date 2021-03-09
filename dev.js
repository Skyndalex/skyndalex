exports.load = (gateway, discord) => {
    gateway.command("dev", "eval", "eval", "eval (kod)", [], (client, msg) => {
        const owners = ["509014773006991376", "636096693712060416"];
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
        const owners = ["509014773006991376", "636096693712060416"];
        if (!owners.includes(msg.author.id)) return client.events.error(client, "nopermission", msg);

        const user = msg.mentions[0] = msg.mentions[0] || msg.author;
        discord.createMessage(msg, {
            embed: {
                description: `Dodano gbana dla ${user.username}`,
                color: 0x2ecc71
            },
        })
    });
}
