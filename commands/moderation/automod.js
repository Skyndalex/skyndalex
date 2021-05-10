const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")

    switch(args[0]) {
        case 'add':
            const blacklistword = args.slice(1).join(" ")

            await r.table("system").update({blacklistword: blacklistword}).run(client.con)

            message.channel.send("sucess")
            break;
        case 'delete':
            message.channel.send("soontm")
            break;
        case 'edit':
            message.channel.send("soontm")
            break;
        default:
            client.sender(message, "System automoderacji", "", client.moderationFooter, "GREEN", [
                {
                    name: "> \`automod add\`",
                    value: "Dodaj słowo do blacklisty"
                },
                {
                    name: "> \`automod delete\`",
                    value: "Usuń słowo z blacklisty"
                },
                {
                    name: "> \`automod edit\`",
                    value: "Edytuj słowo w blackliście"
                }
            ])
    }
}
exports.help = {
    name: "automod",
    aliases: ["automoderation"],
    category: "moderation",
}