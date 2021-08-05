const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    switch (args[0]) {
        default: client.sender(message, "Menu ustawień ticketów serwerowych", "", "UWAGA: TICKETY SĄ W TRYBIE TESTOWYM I POSIADAJĄ SPORO BŁĘDÓW!", "GREEN", [
            {
                name: "\`ticket activate\`",
                value: "Aktywuj tickety na swoim serwerze"
            },
            {
                name: "\`ticket disable\`",
                value: "Wyłącz tickety na swoim serwerze"
            },
            {
                name: "\`ticketsetting [zmienna] [wartość]\`",
                value: "Skonfiguruj tickety"
            },
        ], "", "", "")

            break;
        case 'activate':
            await r.table("tickets").insert({ id: message.guild.id, tickets: true }).run(client.con).catch(err => {
                message.channel.send(`Wystąpił problem!\n${err}`)
            })

            message.channel.send("Tickety zostały aktywowane na tym serwerze. Skonfiguruj je za pomocą komendy \`ticketsetting\`.")
            break;
        case 'disable':
            await r.table("tickets").update({ tickets: false }).run(client.con)

            message.channel.send("Tickety zostały wyłączone.")
            break;
    }
}
exports.help = {
    name: "ticket",
    description: "Ustaw tickety serwerowe",
    category: "tools",
    aliases: ["tc"]
}