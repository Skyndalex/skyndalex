const r = require("rethinkdb")
exports.run = async (client, message) => {
    const table = await r.table("economy").get(message.author.id).run(client.con)
    if (!table?.job) return client.sender(message, "", "**Błąd**\n\nNie dołączyłeś do żadnej pracy!", "Ekonomia", "RED")
    switch (table?.job) {
        case "developer":
            let developerMoney = (Math.floor(Math.random() * (150 - 0)))

            client.sender(message, ``, `Twoja praca: **Developer**\n\nOtrzymano łącznie ${developerMoney} monet!`, `Ekonomia`, `GREEN`, ``, ``, ``)

            await r.table("economy").update({ money: table.money + developerMoney }).run(client.con)
            break;
        case "miner":
            let minerMoney = (Math.floor(Math.random() * (100 - 0)))

            client.sender(message, ``, `Twoja praca: **Górnik**\n\nOtrzymano łącznie ${minerMoney} monet!`, `Ekonomia`, `GREEN`, ``, ``, ``)

            await r.table("economy").update({money: table.money + minerMoney}).run(client.con)
            break;
    }
}
exports.help = {
    name: "work",
    usage: "work",
    perms: "global.send_messages.work",
    category: "economy",
    description: "Pracuj ",
}