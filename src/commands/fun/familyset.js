const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    const u = await r.table("families").get(message.author.id).run(client.con)

     switch (args[0]) {
         default:
         client.sender(message, "Ustawienia rodzin", "", "", "GREEN", [
             {
                name: "> \`familyset name\`",
                value: "Ustaw nazwę rodziny"
             },
             {
                 name: "> \`familyset desc\`",
                 value: "Ustawia opis rodziny"
             }
         ])
         break;
         case 'name':
             if (!u?.family) return message.channel.send("Nie masz rodziny!")

             const name = args.slice(1).join(" ")
             if (!name) return client.sender(message, "Błąd!", "Nie podałeś nazwy rodziny!", "", "RED", "", "")

             r.table("families").get(message.author.id).update({familyname: name}).run(client.con)

             client.sender(message, "", `Pomyślnie ustawiono nazwę rodziny na: ${name}`, "", "GREEN", "", "")
            break;
            case 'desc':
                if (!u?.family) return message.channel.send("Nie masz rodziny!")
   
                const desc = args.slice(1).join(" ")
                if (!desc) return client.sender(message, "Błąd!", "Nie podałeś opisu!", "", "RED", "", "")
   
                r.table("families").get(message.author.id).update({familydesc: desc}).run(client.con)
   
                client.sender(message, "", `Pomyślnie ustawiono opis rodziny na: ${desc}`, "", "GREEN", "", "")
               break;
     }
}
    exports.help = {
        name: "familyset",
        description: "Ustawienia rodzin",
        category: "fun"
    }