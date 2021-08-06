const r = require("rethinkdb") 
exports.run = async (client, message, args) => {
    //const g = await r.table("todo").get(message.author.id).run(client.con)
    const aargs = args.slice(1).join(' ')

    const g = r.table("todo")

    switch (args[0]) {
        case "add":
            if (args[1]) {
                g.insert({'uid': message.author.id, 'text': aargs}).run(client.con) 
                client.sender(message, "Dodano", `Dodano ${aargs} do twojej listy todo`, "Zauważyłeś błąd lub nie wiesz, jak coś zrobić? Dołącz na nasz support (;support)", "GREEN", )
            } else {
                client.sender(message, "Błąd", "Aby dodać coś do todo musisz podać rzecz do dodania", "Zauważyłeś błąd lub nie wiesz, jak coś zrobić? Dołącz na nasz support (;support)", "RED", )
            }
            break;
        case "remove":

            break;
        case "list":
                let ttd = []
                await g.filter({uid: message.author.id}).forEach(function(h, index) {
                    return ttd.push({name: index, value: h.text})
                }).run(client.con)
                client.sender(message, "Lista todo", "", "Zauważyłeś błąd lub nie wiesz, jak coś zrobić? Dołącz na nasz support (;support)", "GREEN", ttd)
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