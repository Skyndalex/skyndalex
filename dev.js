exports.load = (gateway, discord) => {
    gateway.command("dev", "eval", "eval", "eval (kod)", [], (client, msg) => {
        let owners = ["509014773006991376", "636096693712060416"];
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
}
