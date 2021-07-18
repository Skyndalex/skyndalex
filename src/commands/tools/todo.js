const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const g = await r.table("todo").get(message.author.id).run(client.con)

    switch (args[0]) {
    case "add":
        break;
    case "remove":
        break;
    case "list":
        break;
    default:
        client.sender(message, "Pomoc - Todo", "KLUCZE: [Przejdź](https://docs.krivebot.xyz/pl/todo)", "Zauważyłeś błąd lub nie wiesz, jak coś zrobić? Dołącz na nasz support (;support)", "GREEN", [
            {
                name: "Todo - Pomoc",
                value: "Pomoc dotycząca logów: https://docs.krivebot.xyz/todo"
            },
            {
                name: "Todo - Dodawanie",
                value: "\`todo add [wartość]\`"
            },
            {
                name: "Todo - Usuwanie",
                value: "\`todo remove [wartość]\`"
            },
            {
                name: "Todo - Lista",
                value: "\`todo list\`"
            }
        ])
    break;
    
    }
};

exports.help = {
    name: "todo",
    description: "Lista todo",
    category: "tools",
    aliases: []
}